const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    save() {
        const _db = getDb();
        if(this._id) {

        } else {
            return _db.collection("users").insertOne(this).then(_=>{
                console.log(_);
            }).catch(_=>{
                console.log(_.message);
            });
        }
    }

    static findById(id) {
        const _db = getDb();
        return _db.collection("users").findOne({_id:new ObjectId(id)}).then(_=>{
            return _;
        }).catch(_=>{
            console.log(_.message);
        });
    }
}

module.exports = User;