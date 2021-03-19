var router = require('express').Router();
const postCtrl = require('../controllers/posts');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

// The root route renders our only view
router.get('/posts', postCtrl.index);
router.get('/posts/new', postCtrl.new);
router.get('/posts/:id', postCtrl.show);
router.get('/posts/:id/edit', postCtrl.edit);

router.put('/posts/:id', postCtrl.update);

router.post('/posts', upload.single('image'), postCtrl.create);

router.delete('/posts/:id', postCtrl.delete);


module.exports = router;