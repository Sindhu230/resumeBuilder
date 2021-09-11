const User = require('../models/User')
const env = require('../DB')
const jwt = require('jsonwebtoken')
const Cv = require('../models/resume')

exports.cvdata = async function(req, res){
  //const {name, contact, address, Objective,workExperience, academicQualification} = req.body
  //console.log(req.body);
  // Cv.save(function (err) {
  //   if (err) {
  //     return res.status(422).json({
  //       'error': 'Oops! Something went wrong'
  //     })
  //   }
  //   return res.status(200).json({ 'registered': true })
  // })
  let _id=parseToken(req.headers.authorization)
  const s=JSON.stringify(_id);
  let id=JSON.parse(s).id;
   const found=await Cv.find({userid:id}).exec();
   console.log(found)
   if(found.length===0){
    let cv = new Cv({userid:id,data:req.body.data});
    console.log("test");
    console.log(req.headers.authorization);
    cv.save().then(cv => {console.log(cv);});
   }
   else{
     Cv.findOneAndUpdate({userid:id}, {data:req.body.data}, {new: true})
     .then(cv => {console.log(cv)})
     .catch(err => console.log(err));
   }
   res.status(200).json({'success':true});
}

exports.getdata=async function(req,res){
  let _id=parseToken(req.headers.authorization)
  const s=JSON.stringify(_id);
  let id=JSON.parse(s).id;
  console.log("buwvnwoirnvwion ")
  const found=await Cv.find({userid:id}).exec();
 // console.log(found[0])
  if(found.length===0){
    console.log("last")
    return res.status(422).send( 'error')
  }
  else{
    console.log("last")
   // console.log(found[0].data)
    const obj=Object.assign({},found[0])
    console.log(obj._doc.data);
    return res.status(200).send(obj._doc.data)
  }
}

exports.register = function (req, res) {
  const { firstName, lastName, email, phone, work, password, passwordConfirmation } = req.body
  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  } 

  if (password != passwordConfirmation) {
    return res.status(422).json({ 'error': 'Password does not match' })
  }
  User.findOne({ email }, function (err, existingUser) {
    if (err) {
      return res.status(422).json({ 'error': 'Oops! Something went Wrong' })
    }
    if (existingUser) {
      return res.status(422).json({ 'error': 'User already exists' })
    }
    else {
      const user = new User({
        firstName, lastName, email, phone, work, password
      })

      user.save(function (err) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        return res.status(200).json({ 'registered': true })
      })
    }
  })
 }



// Update ...........................
 exports.update = async (req, res) => {
  const { _id, email, firstName, lastName, phone, work } = req.body
  // console.log(req.body);

  try {
    const result = await User.findOneAndUpdate({email: req.body.email}, {

      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        work: req.body.work
      }
    }, {
      new: true,
      useFindAndModify: false
    })

    //console.log(result);
    if (result) {
      json_token = jwt.sign(
        {
          id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          phone: result.phone,
          work: result.work,
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }

  } catch(err) {
    console.log(err)
  }



}

// ..................................




exports.login = function (req, res) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).json({ 'error': 'Please provide email or password' })
  }
  User.findOne({ email }, function (err, user) {
    if (err) {
      return res.status(422).json({
        'error': 'Oops! Something went wrong'
      })
    }

    if (!user) {
      return res.status(422).json({ 'error': 'Invalid user' })
    }

    if (user.hasSamePassword(password)) {
      json_token = jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          work: user.work,
        },
        env.secret,
        { expiresIn: '1h' })

      return res.json(json_token)
    }
    else {
      return res.status(422).json({ 'error': 'Wrong email or password' })
    }
  })
}

exports.authMiddleware = function (req, res, next) {
  const json_token = req.headers.authorization
  try {
    if (json_token) {
      const user = parseToken(json_token)
      User.findById(user.userId, function (err, user) {
        if (err) {
          return res.status(422).json({
            'error': 'Oops! Something went wrong'
          })
        }
        if (user) {
          res.locals.user = user
          next()
        }
        else {
          return res.status(422).json({ 'error': 'Not authorized user' })
        }
      })
    }
    else {
      return res.status(422).json({ 'error': 'Not authorized user' })
    }
  } catch (err) {
    res.status(403).json({
      success: false,
      message: err
    })
  }
}

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], env.secret)
}

