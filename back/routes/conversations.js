const express = require('express')
const router = express.Router()
//const crypto = require('crypto')
//const fs = require('fs')
const conversationqueries = require('../utils/queries/conversations/conversationqueries')
const messagequeries = require('../utils/queries/conversations/messagequeries')


router.get("/getconversations", async (req,res) => {
  //Réccupération des conversations d'un utilisateur
  const userID = req.user_id
  
    conversationqueries.getConvByIDuser(userID).then((result) => {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          delete result[i].user_id1;
          delete result[i].user_id2;
          result[i].ID_conversation = result[i].ID_conversation;
        }
        return res.status(200).json(result);
      }
    }).catch((error) => {
      console.log("error");
      return res.status(401).json({ error: "invalides" });
    })
  })

router.get("/getmessage/:conversationId", /*authenticateToken,*/ async (req,res) => {
  //Récupération des messages pour une conversation donnée
  const userID = req.user_id;

  let conversationId = req.params.conversationId;
  conversationqueries.getConvByIDuser(userID).then((result) => {
    if (result) {
      for (let i = 0; i < result.length; i++) {
        delete result[i].user_id1;
        delete result[i].user_id2;
        result[i].ID_conversation = result[i].ID_conversation;
      }
      //return res.status(200).json(result);
    }
  }).catch((error) => {
    console.log("error");
    return res.status(401).json({ error: "invalides" });
  })
  messagequeries.getMessageByIDconv(conversationId, userID).then((result) => {
    if (result) {
      for (let i = 0; i < result.length; i++) {
        delete result[i].id;
        delete result[i].conversation_id;
        delete result[i].user_id;
        result[i].ID_conversation = result[i].ID_conversation;
      }
      return res.status(200).json(result);
    }
  }).catch((error) => {
    //console.log(error);
    return res.status(401).json({ error: "invalides" });
  })
})

router.post("/sendmessage/:conversationId", async (req,res) => {
  const userID = req.user_id;
  let conversationId = req.params.conversationId;

  const {message} = req.body;
  if (message == ""){
    return res.status(401).json({ error: "message vide" });
  }

  conversationqueries.getConvByIDuser(userID).then((result) => {
    if (result) {
      for (let i = 0; i < result.length; i++) {
        delete result[i].user_id1;
        delete result[i].user_id2;
        result[i].ID_conversation = result[i].ID_conversation;
      }
      //return res.status(200).json(result);
    }
  }).catch((error) => {
    console.log("error");
    return res.status(401).json({ error: "invalides" });
  })

  messagequeries.createMessage(conversationId, userID, message).then((result) => {
    if (result) {
      return res.status(200).json({ ok: true });
    }
  }).catch((error) => {
      console.log(error);
      return res.status(401).json({ error: "invalides" });
  });


});

router.post("/newconversation", async (req,res) => {
  const userID = req.user_id;
  const {email} = req.body;

  if (email == ""){
    return res.status(401).json({ error: "username vide" });
  }

  conversationqueries.createConversation(userID, email).then((result) => {
    if (result) {
      return res.status(200).json({ ok: true });
    }
  }).catch((error) => {
      console.log(error);
      return res.status(401).json({ error: error });
  });
});


router.get("/getconversation/:conversationId", async (req,res) => {
  const userID = req.user_id;
  let conversationId = req.params.conversationId;

  conversationqueries.getConvByIDuser(userID).then((result) => {
    if (result) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].id == conversationId){
          delete result[i].user_id1;
          delete result[i].user_id2;
          return res.status(200).json(result[i]);
        }
      }
      return res.status(401).json({ error: "not auto" });
    }
  }).catch((error) => {
    console.log("error");
    return res.status(401).json({ error: "invalides" });
  })
});
module.exports = router