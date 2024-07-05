document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  const ONE3D_Model_ID = "SUV";
  const ONE3D_Variant_ID = "SUV";
  const ONE3D_Color_ID = "RedCrystalMetallic";

  let isInteriorView = false;
  let isBackView = false;
  let backViewButton;


  const colorOptions = [
    { id: "RedCrystalMetallic", name: "Red Crystal" },
    { id: "CrystalBlue", name: "Blue Crystal" },
    { id: "GrayMetallic", name: "Gray Metallic" },
    { id: "Snowflexwhite", name: "Snowflex White" },
    { id: "SilverMetallic", name: "Silver Metallic" },
    { id: "JetBlack", name: "Jet Black" }
  ];

  ONE3D.init(
    "one3d",
    "https://ee-deploy-website.s3.amazonaws.com/ee_suv/" + "one3d/",
    ONE3D_Model_ID,
    ONE3D_Variant_ID,
    {
      showDefaultLoader: true,
      color: ONE3D_Color_ID,
    }
  )
    .then((successData) => {
      loadDialogController();
      createColorDropdown();
      registerHotspotActions();
      console.log(successData);
    })
    .catch((error) => {
      console.log(error);
    });

  const toggleView = (e) => {
    const currentState = isInteriorView;
    
    updateButton(!currentState);
    toggleBackViewButton(!currentState);
    
    if (currentState) {
      console.log("Switching to exterior view");
      ONE3D.exteriorView()
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
          updateButton(currentState);
          toggleBackViewButton(currentState);
        });
    } else {
      console.log("Switching to interior view");
      ONE3D.interiorView()
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
          updateButton(currentState);
          toggleBackViewButton(currentState);
        });
    }
  };

  const toggleBackView = (e) => {
    const currentBackState = isBackView;
    
    updateBackViewButton(!currentBackState);
    
    if (currentBackState) {
      console.log("Switching to front view");
      ONE3D.frontseatView()
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
          updateBackViewButton(currentBackState);
        });
    } else {
      console.log("Switching to back view");
      ONE3D.backseatView()
        .then((success) => {
          console.log(success);
        })
        .catch((error) => {
          console.log(error);
          updateBackViewButton(currentBackState);
        });
    }
  };

  const updateButton = (toInterior) => {
    const button = document.getElementById("toggle-view-button");
    if (toInterior) {
      button.innerHTML = "Exterior View";
      isInteriorView = true;
    } else {
      button.innerHTML = "Interior View";
      isInteriorView = false;
    }
  };

  const updateBackViewButton = (toBack) => {
    const backViewButton = document.getElementById('toggle-back-view-button');
    console.log(backViewButton);
    if (backViewButton) {
      if (toBack) {
        backViewButton.innerHTML = "Front View";
        isBackView = true;
      } else {
        backViewButton.innerHTML = "Back View";
        isBackView = false;
      }
    }
  };

  const toggleBackViewButton = (show) => {
    if (!backViewButton) {
      backViewButton = document.createElement('button');
      backViewButton.id = "toggle-back-view-button";
      backViewButton.innerHTML = "Back View";
      backViewButton.addEventListener("click", toggleBackView);
      document.getElementById("control-panel").appendChild(backViewButton);
    }

    backViewButton.style.display = show ? "inline-block" : "none";
  };

  const loadDialogController = () => {
    const controlDiv = document.createElement('div');
    controlDiv.id = "control-panel";

    const toggleButton = document.createElement('button');
    toggleButton.id = "toggle-view-button";
    toggleButton.innerHTML = "Interior View";

    controlDiv.appendChild(toggleButton);
    document.body.appendChild(controlDiv);

    document
      .getElementById("toggle-view-button")
      .addEventListener("click", toggleView);

    toggleBackViewButton(false);
  };

  const registerHotspotActions = () => {
    const options = {
      onEventClicked: (message) => {
        console.log("Event Clicked:", message);
        if (message.message === "Interior View Start") {
          updateButton(true);
          toggleBackViewButton(true);
        } else if (message.message === "Exterior View Start") {
          updateButton(false);
          toggleBackViewButton(false);
        } else if (message.message === "Back View Start") {
          updateBackViewButton(true);
        } else if (message.message === "Front View Start") {
          updateBackViewButton(false);
        }
      },
      onEventComplete: (message) => {
        console.log("Event Complete:", message);
        if (message.message === "Interior View Complete") {
          isInteriorView = true;
        } else if (message.message === "Exterior View Complete") {
          isInteriorView = false;
        } else if (message.message === "Back View Complete") {
          isBackView = true;
        } else if (message.message === "Front View Complete") {
          isBackView = false;
        }
      }
    };
  
    ONE3D.registerClickAction(options)
      .then((success) => {
        console.log("Click actions registered successfully:", success);
      })
      .catch((error) => {
        console.log("Error registering click actions:", error);
      });
  };

  const createColorDropdown = () => {
    const colors = document.createElement('select')
    colors.id = "colors";
    colorOptions.forEach(color => {
      const option = document.createElement('option');
      option.value = color.id;
      option.textContent = color.name;
      colors.appendChild(option);
    });
  
    colors.addEventListener('change', (e) => {
      const selectedColor = e.target.value;
      changeColor(selectedColor);
    });
  
    document.body.appendChild(colors);
  };


  const changeColor = (colorId) => {
    ONE3D.changeColor(colorId)
      .then((success) => {
        console.log(`Color changed to ${colorId} successfully:`, success);
      })
      .catch((error) => {
        console.log(`Error changing color to ${colorId}:`, error);
      });
  };


  // window.addEventListener('resize', function() {
    
  //     ONE3D.resizeWindow();
  //   });
});