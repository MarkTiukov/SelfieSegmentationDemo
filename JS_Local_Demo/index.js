"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// import DeviceDetector from "https://cdn.skypack.dev/device-detector-js@2.2.10";
// import DeviceDetector from "device-detector-js";
var DeviceDetector = require("device-detector-js");
console.log("hello from script");
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os
testSupport([
    { client: 'Chrome' },
]);
function testSupport(supportedDevices) {
    var deviceDetector = new DeviceDetector();
    var detectedDevice = deviceDetector.parse(navigator.userAgent);
    var isSupported = false;
    for (var _i = 0, supportedDevices_1 = supportedDevices; _i < supportedDevices_1.length; _i++) {
        var device = supportedDevices_1[_i];
        if (device.client !== undefined) {
            var re = new RegExp("^".concat(device.client, "$"));
            if (!re.test(detectedDevice.client.name)) {
                continue;
            }
        }
        if (device.os !== undefined) {
            var re = new RegExp("^".concat(device.os, "$"));
            if (!re.test(detectedDevice.os.name)) {
                continue;
            }
        }
        isSupported = true;
        break;
    }
    if (!isSupported) {
        alert("This demo, running on ".concat(detectedDevice.client.name, "/").concat(detectedDevice.os.name, ", ") +
            "is not well supported at this time, continue at your own risk.");
    }
}
/**
 * @fileoverview Demonstrates a minimal use case for MediaPipe face tracking.
 */
var controls = window;
var mpSelfieSegmentation = window;
var examples = {
    images: [],
    // {name: 'name', src: 'https://url.com'},
    videos: []
};
// Our input frames will come from here.
var videoElement = document.getElementsByClassName('input_video')[0];
var canvasElement = document.getElementsByClassName('output_canvas')[0];
var controlsElement = document.getElementsByClassName('control-panel')[0];
var canvasCtx = canvasElement.getContext('2d');
// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
var fpsControl = new controls.FPS();
// Optimization: Turn off animated spinner after its hiding animation is done.
var spinner = document.querySelector('.loading');
spinner.ontransitionend = function () {
    spinner.style.display = 'none';
};
var activeEffect = 'mask';
function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');
    // Update the frame rate.
    fpsControl.tick();
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
    // Only overwrite existing pixels.
    if (activeEffect === 'mask' || activeEffect === 'both') {
        canvasCtx.globalCompositeOperation = 'source-in';
        // This can be a color or a texture or whatever...
        canvasCtx.fillStyle = '#00FF007F'; // person highlight
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
    else {
        canvasCtx.globalCompositeOperation = 'source-out';
        canvasCtx.fillStyle = '#0000FF7F'; // background highlight
        canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
    }
    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.restore();
}
var selfieSegmentation = new SelfieSegmentation({ locateFile: function (file) {
        return "https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@0.1/".concat(file);
    } });
selfieSegmentation.onResults(onResults);
// Present a control panel through which the user can manipulate the solution
// options.
new controls
    .ControlPanel(controlsElement, {
    selfieMode: true,
    modelSelection: 1,
    effect: 'mask'
})
    .add([
    new controls.StaticText({ title: 'MediaPipe Selfie Segmentation' }),
    fpsControl,
    new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
    new controls.SourcePicker({
        onSourceChanged: function () {
            selfieSegmentation.reset();
        },
        onFrame: function (input, size) { return __awaiter(void 0, void 0, void 0, function () {
            var aspect, width, height;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aspect = size.height / size.width;
                        if (window.innerWidth > window.innerHeight) {
                            height = window.innerHeight;
                            width = height / aspect;
                        }
                        else {
                            width = window.innerWidth;
                            height = width * aspect;
                        }
                        canvasElement.width = width;
                        canvasElement.height = height;
                        return [4 /*yield*/, selfieSegmentation.send({ image: input })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); },
        examples: examples
    }),
    new controls.Slider({
        title: 'Model Selection',
        field: 'modelSelection',
        discrete: ['General', 'Landscape']
    }),
    new controls.Slider({
        title: 'Effect',
        field: 'effect',
        discrete: { 'background': 'Background', 'mask': 'Foreground' }
    }),
])
    .on(function (x) {
    var options = x;
    videoElement.classList.toggle('selfie', options.selfieMode);
    activeEffect = x['effect'];
    selfieSegmentation.setOptions(options);
});
