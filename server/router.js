const router = require('express').Router();
const models = require('./models.js');


router
  .route('/questions/:id')
  .get(models.queryAllQuestions)
  // .post()

router
  .route('/questions/:id/answers')
  //.get()
  //.post()

router
  .route('/questions/:id/helpful')
  .put(models.updateQuestionHelpful)

router
  .route('/questions/:id/report')
  .put(models.updateQuestionReport)

router
  .route('/answers/:id/helpful')
  .put(models.updateAnswerHelpful)

router
  .route('/answers/:id/report')
  .put(models.updateAnswerReport)

module.exports = router;