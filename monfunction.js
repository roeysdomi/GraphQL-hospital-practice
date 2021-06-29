
// const mongoose = require('mongoose');
var user = require('./model/User');
var hospital=require('./model/Hospital');


// -------------------enterfunctions-------------------------

const enteruser=(theuser)=>
{

  const pro={
    firstName:theuser.profile.firstName,
    lastName:theuser.profile.lastName,
    email:theuser.profile.email,
    phone: theuser.profile.phone,
  }
    var usr=new user ({profile:pro,role:theuser.role,lastLoginAt:theuser.lastLoginAt,password:theuser.password})

  return usr.save()
}
const enterhospital=(thehospital)=>
{

    var hospi=new hospital ({name:thehospital.name,state:thehospital.state,managersIds:thehospital.managersIds,email:thehospital.email,address:thehospital.address})
    return hospi.save()
}

// --------------------updatesfunctions----------------------
const updatehospital=(theuserid,prop)=>
{

      return  hospital.findOneAndUpdate({_id:theuserid}, { $set: { name: prop.name,address:prop.address,state:prop.state,managersIds:prop.managersIds,email:prop.email} }, {new: true});

}
const updateuser=(theuserid,theuser)=>
{
  const pro={
    firstName:theuser.profile.firstName,
    lastName:theuser.profile.lastName,
    email:theuser.profile.email,
    phone: theuser.profile.phone,
  }

      return  user.findOneAndUpdate({_id:theuserid}, { $set: {profile:pro,role:theuser.role,lastLoginAt:theuser.lastLoginAt,password:theuser.password} }, {new: true});
}
const updatelogin=(theuserid)=>
{
      let g;
    var datetime = new Date();
    console.log(theuserid);

  return    user.find({_id:theuserid},{}).exec()
           .then((user2)=> {

                         if(user2[0].role=="division-manager"||user2[0].role=="hospital-manager")
                         {
                           
                           return    user.findOneAndUpdate({_id:theuserid}, { $set: {lastLoginAt:datetime} }, {new: true});
                         }
                         else
                         {

                            throw new Error("user is not manager or division-manager")
                          }

           }


            )
           .catch(err=>  err)

             console.log(g);

}
// ---------------------------------------------------------------------------
const showhospitals=(userid)=>
{

  return   hospital.find({managersIds:userid},{}).exec()

}

const showAllhospitals=()=>
{

  return   hospital.find({},{}).exec()

}
////-------------------------------------------
const returnrole=(userid)=>
{


     return user.findOne({_id:userid},{}).exec()
     .then(
            (userResult)=>{
              console.log(userResult);
              if(userResult.role=="division-manager")
              {return showAllhospitals()}
              else
              {return showhospitals(userid)}

            }


     ).catch(err =>  err)


}
//----------------------------
exports.enteruser=enteruser;
exports.enterhospital=enterhospital;
//-------------------
exports.updatehospital=updatehospital;
exports.updateuser=updateuser;
exports.updatelogin=updatelogin;
//-----------------------------
exports.showhospitals=showhospitals;
exports.showAllhospitals=showAllhospitals;
///---------------------------
exports.returnrole=returnrole;
