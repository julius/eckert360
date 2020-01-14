var APP_DATA = {
  "scenes": [
    {
      "id": "0-floor",
      "name": "floor",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 2.453977519447159,
        "pitch": 0.37504938497148466,
        "fov": 1.061503331581361
      },
      "linkHotspots": [
        {
          "yaw": 2.550352158512709,
          "pitch": 0.5777591105879587,
          "rotation": 0,
          "target": "2-living_room2"
        },
        {
          "yaw": -0.5925410904729294,
          "pitch": 0.5854654649470135,
          "rotation": 0,
          "target": "5-dressing_room"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-living_room",
      "name": "living_room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.8364242887711733,
          "pitch": 0.6655732387083333,
          "rotation": 0,
          "target": "2-living_room2"
        },
        {
          "yaw": -1.7750176716577641,
          "pitch": 0.3747348288949617,
          "rotation": 0,
          "target": "7-kitchen2"
        },
      ],
      "infoHotspots": []
    },
    {
      "id": "2-living_room2",
      "name": "living_room2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.7214347023035472,
          "pitch": 0.6081249875509389,
          "rotation": 0,
          "target": "0-floor"
        },
        {
          "yaw": 1.2231973833467684,
          "pitch": 0.7506745779161434,
          "rotation": 0,
          "target": "1-living_room"
        },
      ],
      "infoHotspots": []
    },
    {
      "id": "3-bath",
      "name": "bath",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.611641777354464,
          "pitch": 0.744757858035431,
          "rotation": 0,
          "target": "4-bath2"
        },
        {
          "yaw": 1.6888396018253413,
          "pitch": 0.4043568639899995,
          "rotation": 0,
          "target": "5-dressing_room"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-bath2",
      "name": "bath2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.7302544057029685,
          "pitch": 0.8001151872861563,
          "rotation": 0,
          "target": "3-bath"
        },
      ],
      "infoHotspots": []
    },
    {
      "id": "5-dressing_room",
      "name": "dressing_room",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.8557231984922575,
          "pitch": 0.5015220234805824,
          "rotation": 0,
          "target": "0-floor"
        },
        {
          "yaw": -1.375512877912458,
          "pitch": 0.654190186111709,
          "rotation": 0,
          "target": "3-bath"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-kitchen",
      "name": "kitchen",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 2.9358430190292832,
          "pitch": 0.73394673274057,
          "rotation": 0,
          "target": "7-kitchen2"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-kitchen2",
      "name": "kitchen2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.0299388111952066,
          "pitch": 0.4746004978460565,
          "rotation": 0,
          "target": "1-living_room"
        },
        {
          "yaw": -0.7646221122755144,
          "pitch": 0.7098197220084757,
          "rotation": 0,
          "target": "6-kitchen"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
