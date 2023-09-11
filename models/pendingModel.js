import {db} from '../config/db.js';

export const getAllPending = async () => {
    try {
        const pendingAudioList = await db('pending')
            .select('pending.*','uploads.location as link')
            .leftJoin('uploads', 'pending.link', 'uploads.id')
            .returning(["pending.recordid", "pending.userid", "link", "pending.created", "pending.imgid"]);
        console.log("pendingAudioList =>", pendingAudioList);
        return pendingAudioList;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}


//GET RECORD FROM DATABASE BY ID
export const getPending = async (recordid)=>{
    try {
        const audio = await db('pending')
        .select('pending.*','uploads.location as link')
        .leftJoin('uploads', 'link', '=', 'uploads.id')
        .where('pending.recordid', recordid)

        console.log(audio);
        return audio;      

    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }  
}

//ADD PENDING AUDIO
export const addPending = ({userid, name, link}) => {
    return db('pending')
    .insert ({userid, name, link})
    .returning(["recordid", "userid", "link", "created", "imgid"])
  }

  export const uploadSingle = async ({ key, mimetype, location, originalname }, imgid, userid) => {
    const trx = await db.transaction();
    try {
      const file = await db("uploads")
      .insert({ key, mimetype, location, originalname }, 
        [
        "id",
        "key",
        "mimetype",
        "location",
        "originalname",
      ]).transacting(trx);

      const pending = await db('pending')
      .insert ({imgid, userid, link:file[0].id},["recordid", "userid", "link", "created", "imgid"])
      .transacting(trx)

      await trx.commit();
      return pending;


    } catch (error) {
      await trx.rollback();
      console.log(error);
      throw new Error(err.message);
    }
  };
  
  //DELETE PENDING AUDIO
  export const deletePending = (recordid) => {
    return db('pending')
    .where('pending.recordid', recordid)
    .del()

  }

//GET ALL AUDIO WITH USER INFO
export const getPendingWithUserInfo = async (recordid) => {
    try {
      const pendingList = await db('pending')
        .select([
          'pending.*',
          'users.username as creator_username',
          'avatars.link as creator_avatar_link',
          'uploads.location as link' 
        ])
        .where('recordid', recordid)
        .leftJoin('users', 'pending.userid', '=','users.userid')
        .leftJoin('avatars', 'users.avatarid', '=', 'avatars.avatarid')
        .leftJoin('uploads', 'pending.link', '=', 'uploads.id')
        .returning([
          'pending.recordid',
          'pending.userid',
          'link',
          'pending.created',
          'pending.imgid',
          'creator_username',
          'creator_avatar_link'
        ]);

      return pendingList;
    } catch (error) {
      console.log(error);
    }
  };
