const express = require("express");

const router = express.Router();

const uniqid = require("uniqid");

const fs = require("fs");

// GET request for reviews
router.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const db = JSON.parse(data);
      const newNote = req.body;
      const id = "id";
      const noteId = uniqid();
      newNote[id] = noteId;
      db.push(newNote);

      fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) {
          console.log(err);
        } else {
          return res.json(db);
        }
      });
    }
  });
});


router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("db/db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const noteDelete = JSON.parse(data);
      const noteArray = noteDelete.filter((note) => {
        return note.id !== id;
      });

      fs.writeFile("db/db.json", JSON.stringify(noteArray), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.json(noteArray);
          console.log("Deleted!");
        }
      });
    }
  });
});

// router.delete('/api/notes/:id', req, res => {
//     res.send('DELETE req')
// })

// delete rquires an ID so everything should have an ID when posted

// uniqid package

//  const = uniqid() needs attaching to key value

// id will need to be added as a property to POST reqs

module.exports = router;
