global.rootRequire = function(name) {
  return require( __dirname + '/' + name);
};

console.log('Starting ap server');
var _=require('underscore');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var winston = require('winston');
var expressWinston = require('express-winston');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var https = require('https');
var fs = require('fs');

var routes = require('./routes/index');
var api_1_0 = require('./routes/api_1_0');
var users = require('./routes/users');

var authController = require('./controllers/auth');
var SignupController = require('./controllers/sign-up');
var signupController = new SignupController();

var FilesignController = require('./controllers/filesign');
var filesignController = new FilesignController();

var UserController = require('./controllers/user');
var userController = new UserController();

var ScoresheetController = require('./controllers/scoresheet');
var scoresheetController = new ScoresheetController();

var ClubController = require('./controllers/club');
var clubController = new ClubController();

var CountryController = require('./controllers/country');
var countryController = new CountryController();

var ResultsController = require('./controllers/results');
var resultsController = new ResultsController();

var StateController = require('./controllers/state');
var stateController = new StateController();

var StateByCountryController = require('./controllers/statebycountry');
var statebycountryController = new StateByCountryController();

var ResetController = require('./controllers/reset');
var resetController = new ResetController();

var EntryController = require('./controllers/entry');
var entryController = new EntryController();

var ScoretemplateController = require('./controllers/scoretemplate');
var scoretemplateController = new ScoretemplateController();

var JudgeController = require('./controllers/judge');
var judgeController = new JudgeController();

var PaypalController = require('./controllers/paypal');
var paypalController = new PaypalController();

var passport  = require('./controllers/authenticator');
var authorize = require('./controllers/authorizer');

var SubcategoryController = require('./controllers/subcategory');
var subcategoryController = new SubcategoryController();

var CategoryController = require('./controllers/category');
var categoryController = new CategoryController();

var QuestionpageController = require('./controllers/questionpage');
var questionpageController = new QuestionpageController();

var QuestionController = require('./controllers/question');
var questionController = new QuestionController();

var EntryresponseController = require('./controllers/entryresponse');
var entryresponseController = new EntryresponseController();

var CompinstController = require('./controllers/compinst');
var compinstController = new CompinstController();

var BlurbController = require('./controllers/blurb');
var blurbController = new BlurbController();

var SpecialaccessController = require('./controllers/specialaccess');
var specialaccessController = new SpecialaccessController();

var ReportController = require('./controllers/reports');
var reportController = new ReportController();

var FlightController = require('./controllers/flight');
var flightController = new FlightController();

var FlightjudgeController = require('./controllers/flightjudge');
var flightjudgeController = new FlightjudgeController();

var CompsponsorController = require('./controllers/compsponsor');
var compsponsorController = new CompsponsorController();

var SponsorController = require('./controllers/sponsor');
var sponsorController = new SponsorController();

var AwardController = require('./controllers/award');
var awardController = new AwardController();

const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret: config.jwt.secret});


function allowCrossDomain(req,res,next){
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');

  var origin = req.headers.origin;
  if(_.contains(app.get('allowed_origins'), origin)){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Origin', 'http://10.10.1.7:4300');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type, Authorization, Origin');

  if(req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}



var app = express();

app.all('*', function(req, res, next){
  console.log('\n\nRequest Body:');
  console.log(req.body);

  if(process.env.NODE_ENV === 'production'){
    if(req.secure){
      return next();
    };
    res.redirect('https://'+req.hostname + ':' + config.get('port_https') + req.url);
  } else {
    next();
  }
});


//-----------------------------------
// Setup logs

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

if(process.env.NODE_ENV !== 'test'){
  console.log('Not in test mode');
  app.use(logger('dev'));
} else {
  app.use(logger('dev', {stream: accessLogStream} ));
}

console.log('initialising routes');

//-----------------------------------
// Build any models that are required

/*
const Client = require('./models/client');
var client = new Client;
client.build();
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

//app.post('/auth',passport.authenticate('local',{session:false}));

app.use(passport.initialize());
app.router.route('/auth')
  .post(
    passport.authenticate('local', { session: false , scope: []}),
    authController.serializeUser,
    authController.serializeClient,
    authController.generateToken,
    authController.respond
  );



app.use('/api/1.0', api_1_0);
app.use('/Assets', express.static('Assets'));


app.router.route('/filesign/:id/:bucket')
  .get(authenticate, function(req, res){filesignController.signing(req, res);});

app.router.route('/auths')
  .post(authController.postAuths);

app.router.route('/password')
  .post(authenticate, function(req, res){authController.changePassword(req, res);});

app.router.route('/sign-up')
  .post(function(req, res){signupController.post(req, res);});

app.router.route('/reactivate/:username')
  .get(function(req, res){signupController.reactivate(req, res);});

app.router.route('/activate/:id')
  .get(function(req, res){signupController.activate(req, res);});

app.router.route('/reset')
  .post(function(req,res){resetController.post(req,res);});

app.router.route('/emails')
  .get(authenticate, authorize.can('read user lists'), function(req, res){userController.findEmail(req,res);});

app.router.route('/users')
  .put(authenticate, function(req, res){userController.put(req, res);})
  .post(authenticate, function(req, res){userController.post(req, res);})
  .get(authenticate, authorize.can('read user lists'), function(req, res){userController.find(req, res);});

app.router.route('/users/:userId')
  .put( function(req, res){userController.put(req, res);})
  .get(authenticate, authorize.can('read own data', 'read user lists'), function(req, res){userController.findOne(req, res);});


app.router.route('/judges')
  .post(authenticate, function(req, res){judgeController.newJudge(req, res);})
  .put(authenticate, authorize.can('comp edit'), function(req,res){ judgeController.put(req, res);})
  .get(authenticate, authorize.can('read comp data'), function(req, res){judgeController.find(req, res);});

app.router.route('/judges/:id')
  .get(authenticate, authorize.can('read comp data'), function(req,res){ judgeController.findOne(req, res);})
  .put(authenticate, authorize.can('comp edit'), function(req, res){judgeController.put(req, res);});

app.router.route('/clubs')
  .post(authenticate, function(req, res){clubController.post(req, res);})
  .get(authenticate, function(req,res){clubController.find(req, res);});

app.router.route('/clubs/:id')
  .get(authenticate, function(req, res){clubController.findOne(req, res);})
  .put(authenticate, function(req, res){clubController.put(req, res);})


app.router.route('/countries')
  .get(authenticate, function(req, res){countryController.find(req,res);})
  .post(authenticate, authorize.can('run tests'), function(req, res){countryController.post(req, res);});

app.router.route('/countries/:id')
  .get(authenticate, function(req, res){countryController.findOne(req,res);})
  .put(authenticate, function(req, res){countryController.put(req, res);});

app.router.route('/state-by-country/:id')
  .get(authenticate, authorize.can('run tests'), function(req,res){statebycountryController.find(req,res);});

app.router.route('/states')
  .get(authenticate, function(req, res){stateController.func(req,res);});

app.router.route('/states/:id')
  .get(authenticate, function(req, res){stateController.find(req, res);});

app.router.route('/cstates/:id')
  .get(authenticate, function(req, res){stateController.findOne(req, res);});

app.router.route('/states/:country/:id')
  .get(authenticate, function(req, res){stateController.findOne(req, res);});

app.router.route('/users/:id')
  .get(authenticate, function(req, res){userController.findOne(req, res);});

app.router.route('/entries/:id')
  .get(authenticate, function(req, res){entryController.findOne(req, res);})
  .put(authenticate, authorize.can(
    'save entry',
    'comp open'
  ), function(req, res){entryController.put(req,res);});

app.router.route('/entrysummaries/:id')
  .get(authenticate, function(req, res){entryController.findEntrySummary(req, res);});

app.router.route('/compentries')
  .get( authenticate, function(req, res){entryController.findCompEntries(req, res);});

app.router.route('/entries')
  .get( authenticate, function(req, res){entryController.find(req, res);});

app.router.route('/subcategories/new')
  .get(authenticate, function(req, res){subcategoryController.newSubcategory(req, res);});

app.router.route('/subcategories/:id')
//  .put(authenticate, authorize.can('comp edit'), function(req, res){subcategoryController.put(req, res);})
  .put(authenticate, function(req, res){subcategoryController.put(req, res);})
  .get(function(req, res){subcategoryController.findCompSubcategories(req, res);});

app.router.route('/subcategories')
  .get(function(req, res){subcategoryController.findCompSubcategories(req, res);});

app.router.route('/categories/new/:id')
  .get(function(req, res){categoryController.newCategory(req, res);});

app.router.route('/categories/:id')
// TODO: Authorize changes
//  .put(authenticate, authorize.can('comp edit'), function(req, res){categoryController.put(req, res);})
  .put(authenticate, function(req, res){categoryController.put(req, res);})
  .get(function(req, res){categoryController.findCompCategories(req, res);});

app.router.route('/categories')
  .get(function(req, res){categoryController.findCompCategories(req, res);});

app.router.route('/questionpages/new/:id')
  .get(authenticate, function(req, res){questionpageController.newQuestionpage(req, res);});

app.router.route('/questionpages')
  .get(authenticate, function(req, res){questionpageController.findCompetitionPages(req, res);});

app.router.route('/questionpages/:id')
  .put(authenticate, function(req, res){questionpageController.put(req, res);})
  .get(authenticate, function(req, res){questionpageController.findOne(req, res);});

app.router.route('/questions/new')
  .get(authenticate, function(req, res){questionController.newQuestion(req,res);});

app.router.route('/questions')
  .get(authenticate, function(req, res){questionController.findCompetitionQuestions(req, res)});

app.router.route('/questions/:id')
  .put(authenticate,
       function(req, res){questionController.put(req,res)})
  .get(authenticate,
       function(req, res){questionController.findOne(req, res)});

app.router.route('/entryresponses/:id')
  .put(authenticate, function(req, res){entryresponseController.put(req,res);})
  .get(authenticate,
       function(req, res){entryresponseController.findOne(req, res)});

app.router.route('/entryresponses')
  .put(authenticate, function(req, res){entryresponseController.put(req,res);})
  .get(authenticate, function(req, res){entryresponseController.findAllForEntry(req, res)});

app.router.route('/scoresheetstats')
  .get(authenticate,function(req, res){scoresheetController.getFormStats(req, res);});

app.router.route('/scoresheetformids')
  .get(authenticate,function(req, res){scoresheetController.getFormIds(req, res);});

app.router.route('/scoresheets')
// TODO: Make sure that the user is authorised to manage an entry in this competition.
  .post(authenticate, function(req, res){scoresheetController.post(req, res)})
  .get(authenticate, function(req, res){scoresheetController.find(req, res)});

app.router.route('/scoresheets/:id')
// TODO: Make sure that the user is authorised to manage an entry in this competition.
  .put(authenticate, function(req, res){scoresheetController.put(req, res)})
  .get(authenticate, function(req, res){scoresheetController.findOne(req, res)});


app.router.route('/scoretemplates')
  .get(authenticate, function(req, res){scoretemplateController.find(req, res)});

app.router.route('/scoretemplates/:id')
  .get(authenticate, function(req, res){scoretemplateController.findOne(req, res)});

app.router.route('/results')
  .get(function(req, res){resultsController.getCompResult(req, res)});

app.router.route('/compinsts')
  .get( function(req, res){compinstController.find(req,res);});

app.router.route('/compinsts/:id')
  .put( function(req, res){compinstController.put(req, res);})
  .get( function(req, res){compinstController.findOne(req, res)});

app.router.route('/activecompetitions/:id')
  .get(function(req, res){compinstController.findActiveComps(req, res)});

app.router.route('/activecompetitions')
  .get(function(req, res){compinstController.findActiveComps(req, res)});

app.router.route('/blurbs/new/:id')
  .get(function(req, res){blurbController.newBlurb(req, res);});

app.router.route('/blurbs/:id')
  .put(authenticate, function(req, res){blurbController.put(req,res);})
  .get(function(req, res){blurbController.find(req, res)});

app.router.route('/flights/new/:id')
  .get(function(req, res){flightController.newFlight(req, res);});

app.router.route('/flights')
  .get(function(req, res){flightController.find(req, res)});

app.router.route('/flights/:id')
// TODO: Authorize changes
//  .put(authenticate, authorize.can('comp edit'), function(req, res){categoryController.put(req, res);})
  .put(authenticate, function(req, res){flightController.put(req, res);})
  .get(function(req, res){flightController.findOne(req, res);});

app.router.route('/flightjudges/new/:id')
  .get(authenticate, function(req, res){flightjudgeController.newFlightjudge(req, res);});

app.router.route('/flightjudges')
  .get(authenticate, function(req, res){flightjudgeController.findCompFlightjudges(req, res)});

app.router.route('/flightjudges/:id')
  .put(authenticate, function(req, res){flightjudgeController.put(req, res)});

app.router.route('/compsponsors')
  .get(function(req, res){compsponsorController.findCompSponsors(req, res)});

app.router.route('/compsponsors/:id')
  .put(authenticate, function(req, res){compsponsorController.put(req, res)});

app.router.route('/sponsors/new')
  .get(authenticate, function(req, res){sponsorController.newSponsor(req, res)});

app.router.route('/sponsors')
  .get(function(req, res){sponsorController.findCompSponsors(req, res)});

app.router.route('/sponsors/:id')
  .put(authenticate, function(req, res){sponsorController.put(req, res);})
  .get(function(req, res){sponsorController.findOne(req, res)});

app.router.route('/awards/new')
  .get(function(req, res){awardController.newAward(req, res)});

app.router.route('/awards')
  .get(function(req, res){awardController.findCompAwards(req, res)});

app.router.route('/awards/:id')
  .put(authenticate, function(req, res){awardController.put(req, res);});


app.router.route('/specialaccesses/:compInstId/:userId')
  .get(authenticate, authorize.can('read own data'), function(req, res){specialaccessController.find(req, res)});

app.router.route('/reports/competition/:compInstId')
  .get(authenticate, authorize.can('read comp data'), function(req, res){reportController.competitionReports(req, res)});

app.router.route('/reports/compstatus/:compInstId')
  .get(authenticate, function(req, res){reportController.competitionStatus(req, res)});

app.router.route('/paypaltest')
  .get(function(req, res){paypalController.testTransaction(req,res)});

console.log('Routes established');

app.use(function(err,req,res,next) {
  if(err instanceof authorize.UnauthorizedError){
    res.status(403).send('Action cannot be completed');
  } else {
    next(err);
  }
});

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

https.createServer({
  key: fs.readFileSync('./common/key.pem'),
  cert: fs.readFileSync('./common/cert.pem')
}, app).listen(config.get('port_https'));

console.log('Server Started on port '+config.get('port_https'));

module.exports = app;
