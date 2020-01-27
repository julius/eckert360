(function() {
    "use strict";
    var APP_DATA_PHOTO_ORIENTATIONS = APP_DATA_PHOTO_ORIENTATIONS || {};

    var Marzipano = window.Marzipano;
    var bowser = window.bowser;
    var screenfull = window.screenfull;
    var data = window.APP_DATA;

    // Grab elements from DOM.
    var panoElement = document.querySelector("#pano");
    var sceneNameElement = document.querySelector("#titleBar .sceneName");
    var sceneElements = document.querySelectorAll("#sceneList .scene");
    var sceneListToggleElement = document.querySelector("#sceneListToggle");
    var fullscreenToggleElement = document.querySelector("#fullscreenToggle");

    // Detect desktop or mobile mode.
    if (window.matchMedia) {
        var setMode = function() {
            if (mql.matches) {
                document.body.classList.remove("desktop");
                document.body.classList.add("mobile");
            } else {
                document.body.classList.remove("mobile");
                document.body.classList.add("desktop");
            }
        };
        var mql = matchMedia("(max-width: 500px), (max-height: 500px)");
        setMode();
        mql.addListener(setMode);
    } else {
        document.body.classList.add("desktop");
    }

    // Detect whether we are on a touch device.
    document.body.classList.add("no-touch");
    window.addEventListener("touchstart", function() {
        document.body.classList.remove("no-touch");
        document.body.classList.add("touch");
    });

    // Use tooltip fallback mode on IE < 11.
    if (bowser.msie && parseFloat(bowser.version) < 11) {
        document.body.classList.add("tooltip-fallback");
    }

    // Viewer options.
    var viewerOpts = {
        controls: {
            mouseViewMode: data.settings.mouseViewMode,
        },
    };

    // Initialize viewer.
    var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    var viewTargetParams = {
        yaw: 0,
        pitch: 0,
    };
    var smoothViewUpdate_last = timestamp();
    function smoothViewUpdate() {
        var view = currentScene.view;
        var deltaTime = Math.max(100, timestamp() - smoothViewUpdate_last);
        smoothViewUpdate_last = timestamp();

        if (
            Math.abs(viewTargetParams.yaw - view.yaw()) < 0.005 &&
            Math.abs(viewTargetParams.pitch - view.pitch()) < 0.005
        )
            return;

        var params = {
            yaw:
                view.yaw() +
                (viewTargetParams.yaw - view.yaw()) * 0.001 * deltaTime,
            pitch:
                view.pitch() +
                (viewTargetParams.pitch - view.pitch()) * 0.001 * deltaTime,
        };
        view.setParameters(params);
        viewer.renderLoop().renderOnNextFrame();
    }
    viewer.renderLoop().addEventListener("beforeRender", smoothViewUpdate);

    // Create scenes.
    var scenes = data.scenes.map(function(data) {
        var urlPrefix = "tiles";
        var source = Marzipano.ImageUrlSource.fromString(
            urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
            {
                cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg",
            },
        );
        var geometry = new Marzipano.CubeGeometry(data.levels);

        var limiter = CustomView.limit.traditional(
            data.faceSize,
            (110 * Math.PI) / 180,
            (110 * Math.PI) / 180,
        );

        // var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);
        var view = new CustomView(data.initialViewParameters, limiter);

        // For smoothViewUpdate
        view.updateWithControlParameters = function(parameters) {
            var vfov = this._fov;
            var hfov = Marzipano.util.convertFov.vtoh(
                vfov,
                this._width,
                this._height,
            );
            if (isNaN(hfov)) {
                hfov = vfov;
            }

            viewTargetParams = {
                yaw:
                    viewTargetParams.yaw +
                    parameters.axisScaledX * hfov * 1.25 +
                    parameters.x * 2 * hfov +
                    parameters.yaw,
                pitch:
                    viewTargetParams.pitch +
                    parameters.axisScaledY * vfov +
                    parameters.y * 2 * hfov +
                    parameters.pitch,
            };
            viewTargetParams = view.normalizeToClosest(viewTargetParams);
            viewTargetParams = view.limiter()(viewTargetParams);
            // if (viewTargetParams.yaw < -Math.PI) viewTargetParams.yaw = viewTargetParams.yaw + 2 * Math.PI;
            // if (viewTargetParams.yaw > Math.PI) viewTargetParams.yaw = viewTargetParams.yaw - 2 * Math.PI;
            view.setFov(view.fov() + parameters.zoom * vfov);
        };

        var scene = viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true,
        });

        // var orgUpdateProjection = view._updateProjection;
        // view._updateProjection = function() {
        //     if (this._projectionChanged) {
        //         console.log('UDPATE PROJECTION', this._projMatrix);
        //         orgUpdateProjection.apply(this);
        //         console.log('UDPATE PROJECTION AFTER', this._projMatrix);
        //     }
        // };

        // APP_DATA_HOTSPOTS[data.id].forEach(function(hs) {
        //     createLinkHotspot(scene, hs);
        // });

        // Create link hotspots.
        data.linkHotspots.forEach(function(hotspot) {
            createLinkHotspot(scene, hotspot);
            // var element = createLinkHotspotElement(hotspot);
            // scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        });

        // // Create info hotspots.
        // data.infoHotspots.forEach(function(hotspot) {
        //     var element = createInfoHotspotElement(hotspot);
        //     scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
        // });

        return {
            data: data,
            scene: scene,
            view: view,
        };
    });

    if (screenfull.enabled) {
        document.body.classList.add("fullscreen-enabled");
        fullscreenToggleElement.addEventListener("click", function() {
            screenfull.toggle();
        });
        screenfull.on("change", function() {
            if (screenfull.isFullscreen) {
                fullscreenToggleElement.classList.add("enabled");
            } else {
                fullscreenToggleElement.classList.remove("enabled");
            }
        });
    } else {
        document.body.classList.add("fullscreen-disabled");
    }

    // Set handler for scene list toggle.
    // sceneListToggleElement.addEventListener('click', toggleSceneList);
    sceneListToggleElement.addEventListener("click", function() {
        document.getElementById("imageNav").classList.add("active");
    });
    document
        .querySelector("#imageNav .imageNavBackdrop")
        .addEventListener("click", function() {
            document.getElementById("imageNav").classList.remove("active");
        });
    document
        .querySelector("#imageNav .close")
        .addEventListener("click", function() {
            document.getElementById("imageNav").classList.remove("active");
        });
    document
        .querySelectorAll("#imageNav .scenePreview")
        .forEach(function(scenePreview) {
            scenePreview.addEventListener("click", function() {
                var sceneId = scenePreview.getAttribute("data-scene");
                switchScene(findSceneById(sceneId));
                document.getElementById("imageNav").classList.remove("active");
            });
        });

    function sanitize(s) {
        return s
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;");
    }

    var currentScene = null;
    var lastScene = null;
    var introTime = 0;
    var introYaw = 0;
    var outroYaw = 0;
    var TRANSITION_TIME = 450;
    var MOVEMENT_DISTANCE = 0.3;

    viewer.renderLoop().addEventListener("beforeRender", function() {
        var dtIntroTime = Date.now() - introTime;

        if (currentScene) {
            if (dtIntroTime < TRANSITION_TIME) {
                currentScene.view.setProjectionToMovement(
                    introYaw,
                    (1 - easeInOutQuad(dtIntroTime / TRANSITION_TIME)) *
                        MOVEMENT_DISTANCE *
                        -1,
                );
            } else {
                currentScene.view.setProjectionToUserInput();
            }
        }

        if (lastScene) {
            if (dtIntroTime < TRANSITION_TIME) {
                lastScene.view.setProjectionToMovement(
                    outroYaw,
                    easeInOutQuad(dtIntroTime / TRANSITION_TIME) *
                        MOVEMENT_DISTANCE,
                );
            } else {
                lastScene.view.setProjectionToUserInput();
            }
        }
    });

    function switchScene(scene) {
        var photoOrientations = APP_DATA_PHOTO_ORIENTATIONS[scene.data.id] || {
            yaw: 0,
            roll: 0,
        };

        if (currentScene) {
            var photoOrientationsCurrentScene = APP_DATA_PHOTO_ORIENTATIONS[
                currentScene.data.id
            ] || {
                yaw: 0,
                roll: 0,
            };
            viewTargetParams = {
                pitch: viewTargetParams.pitch,
                yaw:
                    currentScene.view.yaw() -
                    photoOrientationsCurrentScene.yaw +
                    photoOrientations.yaw,
            };
            scene.view.setParameters(viewTargetParams);
            lastScene = currentScene;
            introYaw =
                outroYaw -
                photoOrientationsCurrentScene.yaw +
                photoOrientations.yaw;
        } else {
            viewTargetParams = {
                pitch: 0,
                yaw: photoOrientations.yaw,
            };
            scene.view.setParameters(viewTargetParams);
        }

        scene.scene.switchTo({
            transitionDuration: TRANSITION_TIME * 0.8,
            transitionUpdate: function(val, newScene) {
                var eased = easeInOutQuad(val);
                newScene.layer().setEffects({
                    opacity: eased,
                });
            },
        });
        updateSceneName(scene);
        updateSceneList(scene);

        introTime = Date.now();

        currentScene = scene;
    }

    function updateSceneName(scene) {
        sceneNameElement.innerHTML = sanitize(scene.data.name);
    }

    function updateSceneList(scene) {
        for (var i = 0; i < sceneElements.length; i++) {
            var el = sceneElements[i];
            if (el.getAttribute("data-id") === scene.data.id) {
                el.classList.add("current");
            } else {
                el.classList.remove("current");
            }
        }
    }

    function createLinkHotspot(scene, hotspot) {
        // Create wrapper element to hold icon and tooltip.
        var wrapper = document.createElement("div");
        wrapper.classList.add("hotspot");
        wrapper.classList.add("link-hotspot");

        // // Create image element.
        // var icon = document.createElement('img');
        // icon.src = '../img/link.png';
        // icon.classList.add('link-hotspot-icon');
        // wrapper.appendChild(icon);

        var circle = document.createElement("div");
        circle.className = "circle";
        wrapper.appendChild(circle);

        var arrow = document.createElement("i");
        arrow.className = "arrow fa fa-chevron-up";
        circle.appendChild(arrow);

        // // Set rotation transform.
        // var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
        // for (var i = 0; i < transformProperties.length; i++) {
        //     var property = transformProperties[i];
        //     icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
        // }

        // Prevent touch and scroll events from reaching the parent element.
        // This prevents the view control logic from interfering with the hotspot.
        stopTouchAndScrollEventPropagation(wrapper);

        // // Create tooltip element.
        // var tooltip = document.createElement('div');
        // tooltip.classList.add('hotspot-tooltip');
        // tooltip.classList.add('link-hotspot-tooltip');
        // tooltip.innerHTML = findSceneDataById(hotspot.target).name;
        // wrapper.appendChild(tooltip);

        var hs = scene.hotspotContainer().createHotspot(
            wrapper,
            { yaw: hotspot.yaw, pitch: hotspot.pitch },
            {
                perspective: {
                    radius: 400, //hotspot.radius,
                    // extraTransforms: 'rotateX(' + hotspot.rotationX + 'deg)'
                },
            },
        );

        hs.travelToScene = function() {
            outroYaw = hotspot.yaw;
            switchScene(findSceneById(hotspot.target));
        };
        wrapper.addEventListener("click", hs.travelToScene);
        wrapper.addEventListener("mouseup", function(ev) {
            ev.stopPropagation();
        });
    }

    // Prevent touch and scroll events from reaching the parent element.
    function stopTouchAndScrollEventPropagation(element) {
        var eventList = [
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "wheel",
            "mousewheel",
        ];
        for (var i = 0; i < eventList.length; i++) {
            element.addEventListener(eventList[i], function(event) {
                event.stopPropagation();
            });
        }
    }

    function findSceneById(id) {
        for (var i = 0; i < scenes.length; i++) {
            if (scenes[i].data.id === id) {
                return scenes[i];
            }
        }
        return null;
    }

    function findSceneDataById(id) {
        for (var i = 0; i < data.scenes.length; i++) {
            if (data.scenes[i].id === id) {
                return data.scenes[i];
            }
        }
        return null;
    }
    function easeOutExpo(pos) {
        return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
    }
    function easeInOutQuad(pos) {
        if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 2);
        return -0.5 * ((pos -= 2) * pos - 2);
    }
    function easeInQuart(pos) {
        return Math.pow(pos, 4);
    }
    function timestamp() {
        return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
    }

    var activeHotspot = null;
    function setActiveHotspot(hotspot) {
        if (activeHotspot === hotspot) return;
        if (activeHotspot) {
            activeHotspot.domElement().classList.remove("active");
        }
        activeHotspot = hotspot;
        activeHotspot.domElement().classList.add("active");
    }

    function yawMinDistance(yaw1, yaw2) {
        var jumpDistance = Math.min(
            Math.abs(yaw1 - (yaw2 - Math.PI * 2)),
            Math.abs(yaw1 - (yaw2 + Math.PI * 2)),
        );
        var directDistance = Math.abs(yaw1 - yaw2);
        return Math.min(jumpDistance, directDistance);
    }

    function closestHotspot(yaw) {
        var hotspots = currentScene.scene.hotspotContainer().listHotspots();
        var closestHotspot = hotspots[0];
        var closestDistance = yawMinDistance(hotspots[0].position().yaw, yaw);

        for (var i = 1; i < hotspots.length; i++) {
            var distance = yawMinDistance(hotspots[i].position().yaw, yaw);
            if (distance < closestDistance) {
                closestHotspot = hotspots[i];
                closestDistance = distance;
            }
        }

        return closestHotspot;
    }

    var moveDistance = 0;
    var disableTravelBecauseOfIntro = true;
    viewer.domElement().addEventListener("mousemove", function(ev) {
        moveDistance += Math.abs(ev.movementX) + Math.abs(ev.movementY);

        var coords = currentScene.view.screenToCoordinates({
            x: ev.screenX,
            y: ev.screenY,
        });
        setActiveHotspot(closestHotspot(coords.yaw));
    });

    viewer.domElement().addEventListener("mousedown", function(ev) {
        moveDistance = 0;
    });

    viewer.domElement().addEventListener("mouseup", function(ev) {
        if (disableTravelBecauseOfIntro) {
            disableTravelBecauseOfIntro = false;
            return;
        }

        if (moveDistance > 4) return;

        var coords = currentScene.view.screenToCoordinates({
            x: ev.screenX,
            y: ev.screenY,
        });
        var hotspot = closestHotspot(coords.yaw);
        hotspot.travelToScene();
    });

    // Display the initial scene.
    switchScene(scenes[0]);

    // Intro
    window.addEventListener("mousedown", removeIntro);
    window.addEventListener("touchstart", removeIntro);
    function removeIntro() {
        window.removeEventListener("mousedown", removeIntro);
        window.removeEventListener("touchstart", removeIntro);
        document.querySelector("#intro").classList.add("out");
        document.querySelector("#introBackdrop").classList.add("out");
        setTimeout(function() {
            document.querySelector("#intro").remove();
            document.querySelector("#introBackdrop").remove();
            document.querySelector("#logo").classList.add("show");
        }, 500);
    }
})();
