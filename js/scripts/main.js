function resize() {
    var canvasEl = document.getElementById('canvas');

	// Our canvas must cover full height of screen
	// regardless of the resolution
	var height = window.innerHeight;
	
	// So we need to calculate the proper scaled width
	// that should work well with every resolution
	var ratio = canvasEl.width/canvasEl.height;
	var width = height * ratio;
	
	canvasEl.style.width = (width - 50) +'px';
	canvasEl.style.height = height+'px';
}

var pictureUrl = 'http://www.surfmaticchallenge.com/';
var hashTag = '#SurfExcelMaticLiquid';
var fbHrefLink = 'http://www.surfmaticchallenge.com/';

var context2D;
var context2DPoints;

var isGameStarted = false;
var isDemo = false;
var isHomeScreenVisible;
var isPoints2VoucherVisible;
var isPoints5VoucherVisible;
var isPoints10VoucherVisible;
var isGameOverVisible;
var isHowToPlayVisible;

var surfLiquidPlane;
var surfLiquidBubblePlane;
var surfBubblesPlane;
var restartTexturePlane;
var timerTexturePlane;
var howtoplaytexturePlane;
var pointsImgTexturePlane;

var outputTimerPlaneTexture;
var outputPointsPlaneTexture;
var outputDemoInitPlaneTexture;
var shareOnFbPlane;
var firstVoucherContToPlayPlane;
var yourTimeIsUpPlane;
var gameEndBottleTexturePlane;
var playAgainTexturePlane;
var shareOnFbToEnterDrawPlane;
var enterPhoneNumberBtnPlane;
var finalDrawTexturePlane;
var enterPhoneNumberPlane;
var enterNumberField;
var enterPhoneNumberEnterPlane;
var enterPhoneNumberSkipPlane;

var thirtyPercentPlaneTexture;
var voucherFiveHundredPlane;
var claimRewardBtnPlane;
var shareOnFbVoucherFiveHundred;
var contToPlayFiveHundredPlane;
var outputFinalScorePlane;

var shareOnFbPlaneGameover;
var homeScreenPlane;
var demoTshirtPlane;
var demoBucketPlane;
var skipDemoPlane;
var skipDemoText1Plane;
var skipDemoText2Plane;

var bubbleAnimation;
var StartGamePlaneTexture;
var cupMesh;
var camera;
var backgroundMusic;
var cameraUi;
var scene;
var light;
var canvas;
// All loaded gui textures
var textures = [];
var ball = null;
var bucketInitPlane;
var cleanPlane;
var dirtyPlane;
var arrayOfMeshes = [];
var tshirtActions = [];
var tshirtPickUpActions = [];
var typeOfTshirt = ['dirty', 'clean'];
var coloredTshirts = ['assets/images/cleanlightblue.png', 'assets/images/cleanlightgreen.png', 'assets/images/cleanlightred.png',
                      'assets/images/cleanlightyellow.png', 'assets/images/dirtylightblue.png', 'assets/images/dirtylightgreen.png', 
                      'assets/images/dirtylightred.png', 'assets/images/dirtylightyellow.png'];

var dirtyTshirts = ['assets/images/dirtylightblue.png', 'assets/images/dirtylightgreen.png', 
                    'assets/images/dirtylightred.png', 'assets/images/dirtylightyellow.png'];
var currentMesh;
var nearestMesh;
var currentIndex;
var skybox;
var temp;

var speed =0.01;
var scale = 1;
var direction = new BABYLON.Vector3(0, 0, 0);
var pauseTexturePlane;
var musicTexturePlane;

// var orientationGamma = 0;
// var orientationBeta = 0;
// var orientationAlpha = 0;

// var initialOrientationGamma = 0;
// var initialOrientationBeta = 0;
// var initialOrientationAlpha = 0;

var prevOrientationBetaXAxis = 80;
var prev2;
var prev3;
var currentOrientationBetaAxis = 0;
var isTilted = false;
var isTshirtPicked = false;
var isRubbingEnded = true;
var isZoomed = false;

var swipeDirection;
var prevHitTshirtMesh;
var prevHitTshirtMeshPosition;
var ray;
var hitInfoTshirtMesh;

var tShirtPlacements = new Array;
tShirtPlacements[0] = new BABYLON.Vector3(-5, 0, 20);
tShirtPlacements[1] = new BABYLON.Vector3(35, 0, 10);
tShirtPlacements[2] = new BABYLON.Vector3(58, 0, -19);
tShirtPlacements[3] = new BABYLON.Vector3(60, 0, -55);
tShirtPlacements[4] = new BABYLON.Vector3(48, 0, -85);
tShirtPlacements[5] = new BABYLON.Vector3(22, 0, -100);
tShirtPlacements[6] = new BABYLON.Vector3(-10, 0, -102);
tShirtPlacements[7] = new BABYLON.Vector3(-40, 0, -90);
tShirtPlacements[8] = new BABYLON.Vector3(-55, 0, -58);
tShirtPlacements[9] = new BABYLON.Vector3(-55, 0, -25);
tShirtPlacements[10] = new BABYLON.Vector3(-35, 0, 5);

var tShirtRotations = new Array;
tShirtRotations[0] = 0;
tShirtRotations[1] = 0.6;
tShirtRotations[2] = 1.3;
tShirtRotations[3] =1.6;
tShirtRotations[4] =2.1;
tShirtRotations[5] =2.8;
tShirtRotations[6] =3.2;
tShirtRotations[7] =3.9;
tShirtRotations[8] =4.5;
tShirtRotations[9] =4.9;
tShirtRotations[10] =5.6;

var howtoplaytextureguidePlane1;
var howToPlayContinueBtnPlane;
var temp;

var timeleft = 0;
var pausedTimer;
var points = 0;

window.addEventListener('DOMContentLoaded', function(){
    
    resize();
    canvas = document.getElementById('canvas');

    var engine = new BABYLON.Engine(canvas, true);

    window.addEventListener("resize", function () { // Watch for browser/canvas resize events
        engine.resize();
        var canvasEl = document.getElementById('canvas');
        
        // regardless of the resolution
        var height = window.innerHeight - 200;
        
        // So we need to calculate the proper scaled width
        // that should work well with every resolution
        var ratio = canvasEl.width/canvasEl.height;
        var width = height * ratio;
        
        canvasEl.style.width = width+'px';
        canvasEl.style.height = height+'px';
    });

    // var createScene = function () {
    scene = new BABYLON.Scene(engine);
    scene.checkCollisions=true;

    let loader =  new BABYLON.AssetsManager(scene);

    // Load textures
    let texts = [
        {name:'water', path:'assets/images/water.png'},
        
    ];        

    texts.forEach((text) => {
        let task = loader.addTextureTask(text.name, text.path);
        task.onSuccess = (t) => {
            this.textures[t.name] = t.texture;
        }
    });

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        // Load the sound and play it automatically once ready
        backgroundMusic = new BABYLON.Sound("SURFEXCEL30SMUSIC", "assets/audio/surfexcel30smusic.wav", scene, null, { loop: true, autoplay: true });

        light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 2;
        
        var camera = new BABYLON.DeviceOrientationCamera("camera1", new BABYLON.Vector3(0, 10, -40), scene);
        // camera.setTarget(new BABYLON.Vector3(0,3,-40));
        camera.setTarget(new BABYLON.Vector3(0,0,-10));
        
        // camera controls
        scene.activeCameras.push(camera);
        // scene.activeCameras.push(cameraUi);	
        camera.attachControl(canvas, false);   

        camera.applyGravity = true;
        camera.noRotationConstraint=true;

        var logoTexture = new BABYLON.StandardMaterial("logoTexture", scene);
        logoTexture.diffuseTexture = new BABYLON.Texture("assets/images/logo.png", scene);
        logoTexture.opacityTexture = logoTexture.diffuseTexture;
        logoTexture.backFaceCulling = false;
        
        var logoTexturePlane = BABYLON.MeshBuilder.CreatePlane("logoTexturePlane", {height:3, width: 3}, scene);
        logoTexturePlane.material = logoTexture;	
        logoTexturePlane.name = 'logoTexture';
        logoTexturePlane.position = new BABYLON.Vector3(-5, 7, 20);
        //locks on camera
        logoTexturePlane.parent = camera;

        var temp = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, function() {
            isGameStarted = false;
            console.log("asdasd");
            alert("logo");
            // hideAndShowBasicObjects(true);
    
        });
    
        logoTexturePlane.actionManager = new BABYLON.ActionManager(scene);
        logoTexturePlane.actionManager.registerAction(temp);

        var homeScreenTexture = new BABYLON.StandardMaterial("homeScreenTexture", scene);
        homeScreenTexture.diffuseTexture = new BABYLON.Texture("assets/images/startpage.png", scene);
        homeScreenTexture.opacityTexture = homeScreenTexture.diffuseTexture;
        homeScreenTexture.backFaceCulling = false;
        
        homeScreenPlane = BABYLON.MeshBuilder.CreatePlane("homeScreenPlane", {height:6, width: 10}, scene);
        homeScreenPlane.material = homeScreenTexture;	
        homeScreenPlane.name = 'homeScreenPlane';
        homeScreenPlane.isPickable = true;
        homeScreenPlane.position = new BABYLON.Vector3(-0.4, -1.3, 20);
        homeScreenPlane.renderingGroupId = 1;
        //locks on camera
        homeScreenPlane.parent = camera;

        var homeScreenPlayAndWinTexture = new BABYLON.StandardMaterial("homeScreenPlayAndWinTexture", scene);
        homeScreenPlayAndWinTexture.diffuseTexture = new BABYLON.Texture("assets/images/playandwin.png", scene);
        homeScreenPlayAndWinTexture.opacityTexture = homeScreenPlayAndWinTexture.diffuseTexture;
        homeScreenPlayAndWinTexture.backFaceCulling = false;
        
        var playandwinbtnPlane = BABYLON.MeshBuilder.CreatePlane("playandwinbtnPlane", {height:1.2, width: 3}, scene);
        playandwinbtnPlane.material = homeScreenPlayAndWinTexture;	
        playandwinbtnPlane.name = 'playandwinbtnPlane';
        playandwinbtnPlane.isPickable = true;
        playandwinbtnPlane.position = new BABYLON.Vector3(-0.3, -1, 18);
        playandwinbtnPlane.renderingGroupId = 1;
        //locks on camera
        playandwinbtnPlane.parent = camera;

        var homeScreenAction = new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, function() {
            alert("play");

        });

        playandwinbtnPlane.actionManager = new BABYLON.ActionManager(scene);
        playandwinbtnPlane.actionManager.registerAction(homeScreenAction);
        //homescreen
        // addHomeScreen(camera, scene);
        
        ray = new BABYLON.Ray();
        var rayHelper = new BABYLON.RayHelper(ray);
        var localMeshDirection = new BABYLON.Vector3(0, 0, 4);
        var localMeshOrigin = new BABYLON.Vector3(0, 0, 5);
        var length = 100;

        canvas.addEventListener('touchmove', onTouchMove, false);

        scene.onDispose = function () {
            canvas.removeEventListener("touchmove", onTouchMove);
        
        }

        return scene;
    };

    scene = createScene();
    // scene = createSampleScene();

    window.addEventListener("resize", function () {
        engine.resize();
    });


    loader.onFinish = () => {
        
        // Init scene : camera, light, skybox
        initScene(scene, canvas);
    

        scene.executeWhenReady(() => {
            engine.runRenderLoop(() => {
                scene.render();
            });
        });

    };

    loader.load();
        
});

var onTouchMove = function(evt) {
    evt.preventDefault();
}

function initScene(scene, canvas){
    // var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(-1, 1, 0), scene);
    // light.diffuse = new BABYLON.Color3(1, 0, 0);

    // Skybox
    skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;	

}

