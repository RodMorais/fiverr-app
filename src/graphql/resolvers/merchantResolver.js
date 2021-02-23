

const { Merchant } = require('../../mongo/schema')
const argon2 = require('argon2');


module.exports = {
    Query: {
        async allMerchants () {
            let result = await Merchant.find().exec()
            return result
      },
        async getMerchant(_, args) {
            console.log(args)
            let result = await Merchant.find({ _id: args._id }).exec()
            return result
        }
    },
    Mutation: {
        async addMerchant(_, args) {
            //TODO    Hash Pin with password below
            console.log(args)
            try {
                ///////////////////////////////////////////////////////////
                ///  We hash the password before storage below
                ///________________************____________________________
                let hashedData = {...args, password: await argon2.hash(args.password)}
                console.log(hashedData)
                let response = await Merchant.create(hashedData)
                console.log(response)
                return response
            } catch (error) {
                console.log(error)
                return error.message
            }
      },

      async loginMutation (_, args) {
          try {
              let Merchantdata = await Merchant.find({ email: args.email }).exec()
              if (Merchantdata[0]) {
                ///////////////////////////////////////////////////////////
                ///  we compare the hashed pass and plain to authenticate below
                ///________________************____________________________

                  if (await argon2.verify(Merchantdata[0].password, args.password)) {
                    //TODO    Make a JWT Token to be sent alongside the success
                   
                    let responseData = {...Merchantdata[0]._doc, loginMesssage:"Password match successfully", isAuth: true}
                     
                    return responseData
                } else {
                    return {loginMesssage:"Password did not match", isAuth: false}
                }
              } else {
                  return {loginMesssage: "Merchant does not exist", isAuth: false}
              }
          } catch (error) {
              console.log(error)
              return { loginMessage: error }
          }

      }
    },
    Merchant: {
    //   products: () => {},
    },
  }