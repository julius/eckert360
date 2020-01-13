var APP_DATA = {
    scenes: [
        {
            id: '0-wohn1_4-denoise',
            name: 'wohn1_4-denoise',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                yaw: -1.5659048647354261,
                pitch: 0.13166868393789954,
                fov: 1.437555459941297
            },
            linkHotspots: [
                {
                    yaw: 1.363924603964593,
                    pitch: 0.24975713603533833,
                    rotation: 0,
                    target: '1-wohn2-denoise'
                },
                {
                    yaw: 0.6960015477831725,
                    pitch: 0.16129191094406714,
                    rotation: 0,
                    target: '2-kitchen'
                },
                {
                    yaw: -2.9114683575843046,
                    pitch: 0.14062603196460088,
                    rotation: 0,
                    target: '4-floor1'
                }
            ],
            infoHotspots: []
        },
        {
            id: '1-wohn2-denoise',
            name: 'wohn2-denoise',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                yaw: 1.5353214962356283,
                pitch: 0.07089003647923775,
                fov: 1.437555459941297
            },
            linkHotspots: [
                {
                    yaw: -1.7261870069293632,
                    pitch: 0.16460148836196353,
                    rotation: 0,
                    target: '0-wohn1_4-denoise'
                },
                {
                    yaw: 0.11579628795753827,
                    pitch: 0.2300855116835443,
                    rotation: 0,
                    target: '2-kitchen'
                },
                {
                    yaw: -2.445815327269683,
                    pitch: 0.1298801063733297,
                    rotation: 0,
                    target: '4-floor1'
                }
            ],
            infoHotspots: []
        },
        {
            id: '2-kitchen',
            name: 'kitchen',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                yaw: 0.33374385988175703,
                pitch: 0.10413445264225096,
                fov: 1.437555459941297
            },
            linkHotspots: [
                {
                    yaw: -2.8595791927170655,
                    pitch: 0.16139065293800314,
                    rotation: 0,
                    target: '1-wohn2-denoise'
                },
                {
                    yaw: 1.9050106040681385,
                    pitch: 0.14387644751151107,
                    rotation: 0,
                    target: '3-kitchen2'
                }
            ],
            infoHotspots: []
        },
        {
            id: '3-kitchen2',
            name: 'kitchen2',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                pitch: 0,
                yaw: 0,
                fov: 1.5707963267948966
            },
            linkHotspots: [
                {
                    yaw: -1.6364098101854445,
                    pitch: 0.31127655472301896,
                    rotation: 0,
                    target: '2-kitchen'
                }
            ],
            infoHotspots: []
        },
        {
            id: '4-floor1',
            name: 'floor1',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                pitch: 0,
                yaw: 0,
                fov: 1.5707963267948966
            },
            linkHotspots: [
                {
                    yaw: 1.5824906330420294,
                    pitch: 0.22802487289879636,
                    rotation: 0,
                    target: '5-bath'
                },
                {
                    yaw: -0.9809271629118683,
                    pitch: 0.14042707084172967,
                    rotation: 0,
                    target: '6-bed1'
                },
                {
                    yaw: -3.102061451115066,
                    pitch: 0.19586329167121264,
                    rotation: 0,
                    target: '0-wohn1_4-denoise'
                }
            ],
            infoHotspots: []
        },
        {
            id: '5-bath',
            name: 'bath',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                yaw: 1.6889181575855412,
                pitch: 0.014474915236169394,
                fov: 1.437555459941297
            },
            linkHotspots: [
                {
                    yaw: -1.5383718944343698,
                    pitch: 0.21195871767530505,
                    rotation: 0,
                    target: '4-floor1'
                }
            ],
            infoHotspots: []
        },
        {
            id: '6-bed1',
            name: 'bed1',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                pitch: 0,
                yaw: 0,
                fov: 1.5707963267948966
            },
            linkHotspots: [
                {
                    yaw: -0.6011337114785427,
                    pitch: 0.1913493336494394,
                    rotation: 0,
                    target: '7-bed2'
                },
                {
                    yaw: 2.097585759828327,
                    pitch: 0.18419175860791093,
                    rotation: 0,
                    target: '4-floor1'
                },
                {
                    yaw: 1.7552985182789511,
                    pitch: 0.1470114983563917,
                    rotation: 0,
                    target: '5-bath'
                }
            ],
            infoHotspots: []
        },
        {
            id: '7-bed2',
            name: 'bed2',
            levels: [
                {
                    tileSize: 256,
                    size: 256,
                    fallbackOnly: true
                },
                {
                    tileSize: 512,
                    size: 512
                },
                {
                    tileSize: 512,
                    size: 1024
                },
                {
                    tileSize: 512,
                    size: 2048
                }
            ],
            faceSize: 1344,
            initialViewParameters: {
                pitch: 0,
                yaw: 0,
                fov: 1.5707963267948966
            },
            linkHotspots: [
                {
                    yaw: -0.5672538637884248,
                    pitch: 0.16501356728924854,
                    rotation: 0,
                    target: '6-bed1'
                }
            ],
            infoHotspots: []
        }
    ],
    name: 'Project Title',
    settings: {
        mouseViewMode: 'drag',
        autorotateEnabled: false,
        fullscreenButton: false,
        viewControlButtons: false
    }
};
