import { CSS3DObject } from './CSS3DRenderer.js';
import {loadGLTF, loadTexture, loadTextures, loadVideo} from './loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {

    // initialize MindAR 
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './targets.mind',
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const [
      leftTexture,
      rightTexture,
      portfolioItem0Texture,
      portfolioItem1Texture,
      portfolioItem2Texture,
      portfolioItem3Texture,
      portfolioItem4Texture,
      portfolioItem5Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Ursule_Dollfus_01.jpg',
      './images/Ursule_Dollfus_02.jpg',
      './images/Ursule_Dollfus_03.jpg',
      './images/Ursule_Dollfus_04.jpg',
      './images/Ursule_Dollfus_05.jpg',
      './images/Ursule_Dollfus_05.jpg',
    ]);

    const planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const leftMaterial = new THREE.MeshBasicMaterial({map: leftTexture});
    const rightMaterial = new THREE.MeshBasicMaterial({map: rightTexture});
    const leftIcon = new THREE.Mesh(iconGeometry, leftMaterial);
    const rightIcon = new THREE.Mesh(iconGeometry, rightMaterial);

    const portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    portfolioItem0Video.muted = true;
    const portfolioItem0VideoTexture = new THREE.VideoTexture(portfolioItem0Video);
    const portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: portfolioItem0VideoTexture});
    const portfolioItem0Material = new THREE.MeshBasicMaterial({map: portfolioItem0Texture});
    const portfolioItem1Material = new THREE.MeshBasicMaterial({map: portfolioItem1Texture});
    const portfolioItem2Material = new THREE.MeshBasicMaterial({map: portfolioItem2Texture});
    const portfolioItem3Material = new THREE.MeshBasicMaterial({map: portfolioItem3Texture});
    const portfolioItem4Material = new THREE.MeshBasicMaterial({map: portfolioItem4Texture}); 
    const portfolioItem5Material = new THREE.MeshBasicMaterial({map: portfolioItem5Texture});

    const portfolioItem0V = new THREE.Mesh(planeGeometry, portfolioItem0VideoMaterial); 
    const portfolioItem0 = new THREE.Mesh(planeGeometry, portfolioItem0Material); 
    const portfolioItem1 = new THREE.Mesh(planeGeometry, portfolioItem1Material); 
    const portfolioItem2 = new THREE.Mesh(planeGeometry, portfolioItem2Material); 
    const portfolioItem3 = new THREE.Mesh(planeGeometry, portfolioItem3Material); 
    const portfolioItem4 = new THREE.Mesh(planeGeometry, portfolioItem4Material);  
    const portfolioItem5 = new THREE.Mesh(planeGeometry, portfolioItem5Material);


    const portfolioGroup = new THREE.Group();
    portfolioGroup.position.set(0, 0, -0.01);
    portfolioGroup.position.set(0, 0.6, -0.01);

    portfolioGroup.add(portfolioItem0);
    portfolioGroup.add(leftIcon);
    portfolioGroup.add(rightIcon);
    leftIcon.position.set(-0.7, 0, 0);
    rightIcon.position.set(0.7, 0, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(portfolioGroup);

    const textElement = document.createElement("div");
    const textObj = new CSS3DObject(textElement);
    textObj.position.set(0, -1000, 0);
    textObj.visible = false;
    textElement.style.background = "#FFFFFF";
    textElement.style.padding = "30px";
    textElement.style.fontSize = "60px";

    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(textObj);

    // handle buttons
    leftIcon.userData.clickable = true;
    rightIcon.userData.clickable = true;
    portfolioItem0.userData.clickable = true;
    portfolioItem0V.userData.clickable = true;

    const portfolioItems = [portfolioItem0, portfolioItem1, portfolioItem2, portfolioItem3, portfolioItem4, portfolioItem5]; 
    let currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === leftIcon || o === rightIcon) {
	    if (o === leftIcon) {
	      currentPortfolio = (currentPortfolio - 1 + portfolioItems.length) % portfolioItems.length;
	    } else {
	      currentPortfolio = (currentPortfolio + 1) % portfolioItems.length;
	    }
	    portfolioItem0Video.pause();
	    for (let i = 0; i < portfolioItems.length; i++) {
	      portfolioGroup.remove(portfolioItems[i]);
	    }
	    portfolioGroup.add(portfolioItems[currentPortfolio]);
	  } else if (o === portfolioItem0) {
	    portfolioGroup.remove(portfolioItem0);
	    portfolioGroup.add(portfolioItem0V);
	    portfolioItems[0] = portfolioItem0V;
	    portfolioItem0Video.play();
	  } else if (o === portfolioItem0V) {
	    if (portfolioItem0Video.paused) {
	      portfolioItem0Video.play();
	    } else {
	      portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Anne_Marie_Koechlin
	const [
      Anne_Marie_Koechlin_leftTexture,
      Anne_Marie_Koechlin_rightTexture,
      Anne_Marie_Koechlin_portfolioItem0Texture,
      Anne_Marie_Koechlin_portfolioItem1Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Anne_Marie_Koechlin_01.jpg',
      './images/Anne_Marie_Koechlin_02.jpg',
    ]);

    const Anne_Marie_Koechlin_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Anne_Marie_Koechlin_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Anne_Marie_Koechlin_leftMaterial = new THREE.MeshBasicMaterial({map: Anne_Marie_Koechlin_leftTexture});
    const Anne_Marie_Koechlin_rightMaterial = new THREE.MeshBasicMaterial({map: Anne_Marie_Koechlin_rightTexture});
    const Anne_Marie_Koechlin_leftIcon = new THREE.Mesh(Anne_Marie_Koechlin_iconGeometry, Anne_Marie_Koechlin_leftMaterial);
    const Anne_Marie_Koechlin_rightIcon = new THREE.Mesh(Anne_Marie_Koechlin_iconGeometry, Anne_Marie_Koechlin_rightMaterial);

    const Anne_Marie_Koechlin_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Anne_Marie_Koechlin_portfolioItem0Video.muted = true;
    const Anne_Marie_Koechlin_portfolioItem0VideoTexture = new THREE.VideoTexture(Anne_Marie_Koechlin_portfolioItem0Video);
    const Anne_Marie_Koechlin_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Anne_Marie_Koechlin_portfolioItem0VideoTexture});
    const Anne_Marie_Koechlin_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Anne_Marie_Koechlin_portfolioItem0Texture});
    const Anne_Marie_Koechlin_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Anne_Marie_Koechlin_portfolioItem1Texture});

    const Anne_Marie_Koechlin_portfolioItem0V = new THREE.Mesh(Anne_Marie_Koechlin_planeGeometry, Anne_Marie_Koechlin_portfolioItem0VideoMaterial); 
    const Anne_Marie_Koechlin_portfolioItem0 = new THREE.Mesh(Anne_Marie_Koechlin_planeGeometry, Anne_Marie_Koechlin_portfolioItem0Material); 
    const Anne_Marie_Koechlin_portfolioItem1 = new THREE.Mesh(Anne_Marie_Koechlin_planeGeometry, Anne_Marie_Koechlin_portfolioItem1Material); 


    const Anne_Marie_Koechlin_portfolioGroup = new THREE.Group();
    Anne_Marie_Koechlin_portfolioGroup.position.set(0, 0, -0.01);
    Anne_Marie_Koechlin_portfolioGroup.position.set(0, 0.6, -0.01);

    Anne_Marie_Koechlin_portfolioGroup.add(Anne_Marie_Koechlin_portfolioItem0);
    Anne_Marie_Koechlin_portfolioGroup.add(Anne_Marie_Koechlin_leftIcon);
    Anne_Marie_Koechlin_portfolioGroup.add(Anne_Marie_Koechlin_rightIcon);
    Anne_Marie_Koechlin_leftIcon.position.set(-0.7, 0, 0);
    Anne_Marie_Koechlin_rightIcon.position.set(0.7, 0, 0);

    const Anne_Marie_Koechlin_anchor = mindarThree.addAnchor(1);
    Anne_Marie_Koechlin_anchor.group.add(Anne_Marie_Koechlin_portfolioGroup);

    const Anne_Marie_Koechlin_textElement = document.createElement("div");
    const Anne_Marie_Koechlin_textObj = new CSS3DObject(Anne_Marie_Koechlin_textElement);
    Anne_Marie_Koechlin_textObj.position.set(0, -1000, 0);
    Anne_Marie_Koechlin_textObj.visible = false;
    Anne_Marie_Koechlin_textElement.style.background = "#FFFFFF";
    Anne_Marie_Koechlin_textElement.style.padding = "30px";
    Anne_Marie_Koechlin_textElement.style.fontSize = "60px";

    const Anne_Marie_Koechlin_cssAnchor = mindarThree.addCSSAnchor(1);
    Anne_Marie_Koechlin_cssAnchor.group.add(Anne_Marie_Koechlin_textObj);

    // handle buttons
    Anne_Marie_Koechlin_leftIcon.userData.clickable = true;
    Anne_Marie_Koechlin_rightIcon.userData.clickable = true;
    Anne_Marie_Koechlin_portfolioItem0.userData.clickable = true;
    Anne_Marie_Koechlin_portfolioItem0V.userData.clickable = true;

    const Anne_Marie_Koechlin_portfolioItems = [Anne_Marie_Koechlin_portfolioItem0, Anne_Marie_Koechlin_portfolioItem1]; 
    let Anne_Marie_Koechlin_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Anne_Marie_Koechlin_leftIcon || o === Anne_Marie_Koechlin_rightIcon) {
	    if (o === Anne_Marie_Koechlin_leftIcon) {
	      Anne_Marie_Koechlin_currentPortfolio = (Anne_Marie_Koechlin_currentPortfolio - 1 + Anne_Marie_Koechlin_portfolioItems.length) % Anne_Marie_Koechlin_portfolioItems.length;
	    } else {
	      Anne_Marie_Koechlin_currentPortfolio = (Anne_Marie_Koechlin_currentPortfolio + 1) % Anne_Marie_Koechlin_portfolioItems.length;
	    }
	    Anne_Marie_Koechlin_portfolioItem0Video.pause();
	    for (let i = 0; i < Anne_Marie_Koechlin_portfolioItems.length; i++) {
	      Anne_Marie_Koechlin_portfolioGroup.remove(Anne_Marie_Koechlin_portfolioItems[i]);
	    }
	    Anne_Marie_Koechlin_portfolioGroup.add(Anne_Marie_Koechlin_portfolioItems[Anne_Marie_Koechlin_currentPortfolio]);
	  } else if (o === Anne_Marie_Koechlin_portfolioItem0) {
	    Anne_Marie_Koechlin_portfolioGroup.remove(Anne_Marie_Koechlin_portfolioItem0);
	    Anne_Marie_Koechlin_portfolioGroup.add(Anne_Marie_Koechlin_portfolioItem0V);
	    Anne_Marie_Koechlin_portfolioItems[0] = Anne_Marie_Koechlin_portfolioItem0V;
	    Anne_Marie_Koechlin_portfolioItem0Video.play();
	  } else if (o === Anne_Marie_Koechlin_portfolioItem0V) {
	    if (Anne_Marie_Koechlin_portfolioItem0Video.paused) {
	      Anne_Marie_Koechlin_portfolioItem0Video.play();
	    } else {
	      Anne_Marie_Koechlin_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Chlimene_Koechlin
	const [
      Chlimene_Koechlin_leftTexture,
      Chlimene_Koechlin_rightTexture,
      Chlimene_Koechlin_portfolioItem0Texture,
      Chlimene_Koechlin_portfolioItem1Texture,
      Chlimene_Koechlin_portfolioItem2Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Climene_Dollfus.jpg',
      './images/Climene_Dollfus_02.jpg',
      './images/Climene_Dollfus_03.jpg',
    ]);

    const Chlimene_Koechlin_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Chlimene_Koechlin_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Chlimene_Koechlin_leftMaterial = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_leftTexture});
    const Chlimene_Koechlin_rightMaterial = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_rightTexture});
    const Chlimene_Koechlin_leftIcon = new THREE.Mesh(Chlimene_Koechlin_iconGeometry, Chlimene_Koechlin_leftMaterial);
    const Chlimene_Koechlin_rightIcon = new THREE.Mesh(Chlimene_Koechlin_iconGeometry, Chlimene_Koechlin_rightMaterial);

    const Chlimene_Koechlin_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Chlimene_Koechlin_portfolioItem0Video.muted = true;
    const Chlimene_Koechlin_portfolioItem0VideoTexture = new THREE.VideoTexture(Chlimene_Koechlin_portfolioItem0Video);
    const Chlimene_Koechlin_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_portfolioItem0VideoTexture});
    const Chlimene_Koechlin_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_portfolioItem0Texture});
    const Chlimene_Koechlin_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_portfolioItem1Texture});
    const Chlimene_Koechlin_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Chlimene_Koechlin_portfolioItem2Texture});

    const Chlimene_Koechlin_portfolioItem0V = new THREE.Mesh(Chlimene_Koechlin_planeGeometry, Chlimene_Koechlin_portfolioItem0VideoMaterial); 
    const Chlimene_Koechlin_portfolioItem0 = new THREE.Mesh(Chlimene_Koechlin_planeGeometry, Chlimene_Koechlin_portfolioItem0Material); 
    const Chlimene_Koechlin_portfolioItem1 = new THREE.Mesh(Chlimene_Koechlin_planeGeometry, Chlimene_Koechlin_portfolioItem1Material); 
    const Chlimene_Koechlin_portfolioItem2 = new THREE.Mesh(Chlimene_Koechlin_planeGeometry, Chlimene_Koechlin_portfolioItem2Material); 


    const Chlimene_Koechlin_portfolioGroup = new THREE.Group();
    Chlimene_Koechlin_portfolioGroup.position.set(0, 0, -0.01);
    Chlimene_Koechlin_portfolioGroup.position.set(0, 0.6, -0.01);

    Chlimene_Koechlin_portfolioGroup.add(Chlimene_Koechlin_portfolioItem0);
    Chlimene_Koechlin_portfolioGroup.add(Chlimene_Koechlin_leftIcon);
    Chlimene_Koechlin_portfolioGroup.add(Chlimene_Koechlin_rightIcon);
    Chlimene_Koechlin_leftIcon.position.set(-0.7, 0, 0);
    Chlimene_Koechlin_rightIcon.position.set(0.7, 0, 0);

    const Chlimene_Koechlin_anchor = mindarThree.addAnchor(2);
    Chlimene_Koechlin_anchor.group.add(Chlimene_Koechlin_portfolioGroup);

    const Chlimene_Koechlin_textElement = document.createElement("div");
    const Chlimene_Koechlin_textObj = new CSS3DObject(Chlimene_Koechlin_textElement);
    Chlimene_Koechlin_textObj.position.set(0, -1000, 0);
    Chlimene_Koechlin_textObj.visible = false;
    Chlimene_Koechlin_textElement.style.background = "#FFFFFF";
    Chlimene_Koechlin_textElement.style.padding = "30px";
    Chlimene_Koechlin_textElement.style.fontSize = "60px";

    const Chlimene_Koechlin_cssAnchor = mindarThree.addCSSAnchor(2);
    Chlimene_Koechlin_cssAnchor.group.add(Chlimene_Koechlin_textObj);

    // handle buttons
    Chlimene_Koechlin_leftIcon.userData.clickable = true;
    Chlimene_Koechlin_rightIcon.userData.clickable = true;
    Chlimene_Koechlin_portfolioItem0.userData.clickable = true;
    Chlimene_Koechlin_portfolioItem0V.userData.clickable = true;

    const Chlimene_Koechlin_portfolioItems = [Chlimene_Koechlin_portfolioItem0, Chlimene_Koechlin_portfolioItem1, Chlimene_Koechlin_portfolioItem2]; 
    let Chlimene_Koechlin_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Chlimene_Koechlin_leftIcon || o === Chlimene_Koechlin_rightIcon) {
	    if (o === Chlimene_Koechlin_leftIcon) {
	      Chlimene_Koechlin_currentPortfolio = (Chlimene_Koechlin_currentPortfolio - 1 + Chlimene_Koechlin_portfolioItems.length) % Chlimene_Koechlin_portfolioItems.length;
	    } else {
	      Chlimene_Koechlin_currentPortfolio = (Chlimene_Koechlin_currentPortfolio + 1) % Chlimene_Koechlin_portfolioItems.length;
	    }
	    Chlimene_Koechlin_portfolioItem0Video.pause();
	    for (let i = 0; i < Chlimene_Koechlin_portfolioItems.length; i++) {
	      Chlimene_Koechlin_portfolioGroup.remove(Chlimene_Koechlin_portfolioItems[i]);
	    }
	    Chlimene_Koechlin_portfolioGroup.add(Chlimene_Koechlin_portfolioItems[Chlimene_Koechlin_currentPortfolio]);
	  } else if (o === Chlimene_Koechlin_portfolioItem0) {
	    Chlimene_Koechlin_portfolioGroup.remove(Chlimene_Koechlin_portfolioItem0);
	    Chlimene_Koechlin_portfolioGroup.add(Chlimene_Koechlin_portfolioItem0V);
	    Chlimene_Koechlin_portfolioItems[0] = Chlimene_Koechlin_portfolioItem0V;
	    Chlimene_Koechlin_portfolioItem0Video.play();
	  } else if (o === Chlimene_Koechlin_portfolioItem0V) {
	    if (Chlimene_Koechlin_portfolioItem0Video.paused) {
	      Chlimene_Koechlin_portfolioItem0Video.play();
	    } else {
	      Chlimene_Koechlin_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });

// Edouard Mieg	
	const [
      Edouard_Mieg_leftTexture,
      Edouard_Mieg_rightTexture,
      Edouard_Mieg_portfolioItem0Texture,
      Edouard_Mieg_portfolioItem1Texture,
      Edouard_Mieg_portfolioItem2Texture,
	  Edouard_Mieg_portfolioItem3Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Edouard_Mieg_01.jpg',
      './images/Edouard_Mieg_02.jpg',
      './images/Edouard_Mieg_03.jpg',
	  './images/Edouard_Mieg_04.jpg',
    ]);

    const Edouard_Mieg_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Edouard_Mieg_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Edouard_Mieg_leftMaterial = new THREE.MeshBasicMaterial({map: Edouard_Mieg_leftTexture});
    const Edouard_Mieg_rightMaterial = new THREE.MeshBasicMaterial({map: Edouard_Mieg_rightTexture});
    const Edouard_Mieg_leftIcon = new THREE.Mesh(Edouard_Mieg_iconGeometry, Edouard_Mieg_leftMaterial);
    const Edouard_Mieg_rightIcon = new THREE.Mesh(Edouard_Mieg_iconGeometry, Edouard_Mieg_rightMaterial);

    const Edouard_Mieg_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Edouard_Mieg_portfolioItem0Video.muted = true;
    const Edouard_Mieg_portfolioItem0VideoTexture = new THREE.VideoTexture(Edouard_Mieg_portfolioItem0Video);
    const Edouard_Mieg_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Edouard_Mieg_portfolioItem0VideoTexture});
    const Edouard_Mieg_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Edouard_Mieg_portfolioItem0Texture});
    const Edouard_Mieg_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Edouard_Mieg_portfolioItem1Texture});
    const Edouard_Mieg_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Edouard_Mieg_portfolioItem2Texture});
	const Edouard_Mieg_portfolioItem3Material = new THREE.MeshBasicMaterial({map: Edouard_Mieg_portfolioItem3Texture});

    const Edouard_Mieg_portfolioItem0V = new THREE.Mesh(Edouard_Mieg_planeGeometry, Edouard_Mieg_portfolioItem0VideoMaterial); 
    const Edouard_Mieg_portfolioItem0 = new THREE.Mesh(Edouard_Mieg_planeGeometry, Edouard_Mieg_portfolioItem0Material); 
    const Edouard_Mieg_portfolioItem1 = new THREE.Mesh(Edouard_Mieg_planeGeometry, Edouard_Mieg_portfolioItem1Material); 
    const Edouard_Mieg_portfolioItem2 = new THREE.Mesh(Edouard_Mieg_planeGeometry, Edouard_Mieg_portfolioItem2Material);
	const Edouard_Mieg_portfolioItem3 = new THREE.Mesh(Edouard_Mieg_planeGeometry, Edouard_Mieg_portfolioItem3Material);	


    const Edouard_Mieg_portfolioGroup = new THREE.Group();
    Edouard_Mieg_portfolioGroup.position.set(0, 0, -0.01);
    Edouard_Mieg_portfolioGroup.position.set(0, 0.6, -0.01);

    Edouard_Mieg_portfolioGroup.add(Edouard_Mieg_portfolioItem0);
    Edouard_Mieg_portfolioGroup.add(Edouard_Mieg_leftIcon);
    Edouard_Mieg_portfolioGroup.add(Edouard_Mieg_rightIcon);
    Edouard_Mieg_leftIcon.position.set(-0.7, 0, 0);
    Edouard_Mieg_rightIcon.position.set(0.7, 0, 0);

    const Edouard_Mieg_anchor = mindarThree.addAnchor(3);
    Edouard_Mieg_anchor.group.add(Edouard_Mieg_portfolioGroup);

    const Edouard_Mieg_textElement = document.createElement("div");
    const Edouard_Mieg_textObj = new CSS3DObject(Edouard_Mieg_textElement);
    Edouard_Mieg_textObj.position.set(0, -1000, 0);
    Edouard_Mieg_textObj.visible = false;
    Edouard_Mieg_textElement.style.background = "#FFFFFF";
    Edouard_Mieg_textElement.style.padding = "30px";
    Edouard_Mieg_textElement.style.fontSize = "60px";

    const Edouard_Mieg_cssAnchor = mindarThree.addCSSAnchor(3);
    Edouard_Mieg_cssAnchor.group.add(Edouard_Mieg_textObj);

    // handle buttons
    Edouard_Mieg_leftIcon.userData.clickable = true;
    Edouard_Mieg_rightIcon.userData.clickable = true;
    Edouard_Mieg_portfolioItem0.userData.clickable = true;
    Edouard_Mieg_portfolioItem0V.userData.clickable = true;

    const Edouard_Mieg_portfolioItems = [Edouard_Mieg_portfolioItem0, Edouard_Mieg_portfolioItem1, Edouard_Mieg_portfolioItem2, Edouard_Mieg_portfolioItem3]; 
    let Edouard_Mieg_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Edouard_Mieg_leftIcon || o === Edouard_Mieg_rightIcon) {
	    if (o === Edouard_Mieg_leftIcon) {
	      Edouard_Mieg_currentPortfolio = (Edouard_Mieg_currentPortfolio - 1 + Edouard_Mieg_portfolioItems.length) % Edouard_Mieg_portfolioItems.length;
	    } else {
	      Edouard_Mieg_currentPortfolio = (Edouard_Mieg_currentPortfolio + 1) % Edouard_Mieg_portfolioItems.length;
	    }
	    Edouard_Mieg_portfolioItem0Video.pause();
	    for (let i = 0; i < Edouard_Mieg_portfolioItems.length; i++) {
	      Edouard_Mieg_portfolioGroup.remove(Edouard_Mieg_portfolioItems[i]);
	    }
	    Edouard_Mieg_portfolioGroup.add(Edouard_Mieg_portfolioItems[Edouard_Mieg_currentPortfolio]);
	  } else if (o === Edouard_Mieg_portfolioItem0) {
	    Edouard_Mieg_portfolioGroup.remove(Edouard_Mieg_portfolioItem0);
	    Edouard_Mieg_portfolioGroup.add(Edouard_Mieg_portfolioItem0V);
	    Edouard_Mieg_portfolioItems[0] = Edouard_Mieg_portfolioItem0V;
	    Edouard_Mieg_portfolioItem0Video.play();
	  } else if (o === Edouard_Mieg_portfolioItem0V) {
	    if (Edouard_Mieg_portfolioItem0Video.paused) {
	      Edouard_Mieg_portfolioItem0Video.play();
	    } else {
	      Edouard_Mieg_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Elisabeth Reber
	const [
      Elisabeth_Reber_leftTexture,
      Elisabeth_Reber_rightTexture,
      Elisabeth_Reber_portfolioItem0Texture,
      Elisabeth_Reber_portfolioItem1Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Elisabeth_Reber_01.jpg',
      './images/Elisabeth_Reber_02.jpg',
    ]);

    const Elisabeth_Reber_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Elisabeth_Reber_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Elisabeth_Reber_leftMaterial = new THREE.MeshBasicMaterial({map: Elisabeth_Reber_leftTexture});
    const Elisabeth_Reber_rightMaterial = new THREE.MeshBasicMaterial({map: Elisabeth_Reber_rightTexture});
    const Elisabeth_Reber_leftIcon = new THREE.Mesh(Elisabeth_Reber_iconGeometry, Elisabeth_Reber_leftMaterial);
    const Elisabeth_Reber_rightIcon = new THREE.Mesh(Elisabeth_Reber_iconGeometry, Elisabeth_Reber_rightMaterial);

    const Elisabeth_Reber_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Elisabeth_Reber_portfolioItem0Video.muted = true;
    const Elisabeth_Reber_portfolioItem0VideoTexture = new THREE.VideoTexture(Elisabeth_Reber_portfolioItem0Video);
    const Elisabeth_Reber_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Elisabeth_Reber_portfolioItem0VideoTexture});
    const Elisabeth_Reber_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Elisabeth_Reber_portfolioItem0Texture});
    const Elisabeth_Reber_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Elisabeth_Reber_portfolioItem1Texture});

    const Elisabeth_Reber_portfolioItem0V = new THREE.Mesh(Elisabeth_Reber_planeGeometry, Elisabeth_Reber_portfolioItem0VideoMaterial); 
    const Elisabeth_Reber_portfolioItem0 = new THREE.Mesh(Elisabeth_Reber_planeGeometry, Elisabeth_Reber_portfolioItem0Material); 
    const Elisabeth_Reber_portfolioItem1 = new THREE.Mesh(Elisabeth_Reber_planeGeometry, Elisabeth_Reber_portfolioItem1Material); 


    const Elisabeth_Reber_portfolioGroup = new THREE.Group();
    Elisabeth_Reber_portfolioGroup.position.set(0, 0, -0.01);
    Elisabeth_Reber_portfolioGroup.position.set(0, 0.6, -0.01);

    Elisabeth_Reber_portfolioGroup.add(Elisabeth_Reber_portfolioItem0);
    Elisabeth_Reber_portfolioGroup.add(Elisabeth_Reber_leftIcon);
    Elisabeth_Reber_portfolioGroup.add(Elisabeth_Reber_rightIcon);
    Elisabeth_Reber_leftIcon.position.set(-0.7, 0, 0);
    Elisabeth_Reber_rightIcon.position.set(0.7, 0, 0);

    const Elisabeth_Reber_anchor = mindarThree.addAnchor(4);
    Elisabeth_Reber_anchor.group.add(Elisabeth_Reber_portfolioGroup);

    const Elisabeth_Reber_textElement = document.createElement("div");
    const Elisabeth_Reber_textObj = new CSS3DObject(Elisabeth_Reber_textElement);
    Elisabeth_Reber_textObj.position.set(0, -1000, 0);
    Elisabeth_Reber_textObj.visible = false;
    Elisabeth_Reber_textElement.style.background = "#FFFFFF";
    Elisabeth_Reber_textElement.style.padding = "30px";
    Elisabeth_Reber_textElement.style.fontSize = "60px";

    const Elisabeth_Reber_cssAnchor = mindarThree.addCSSAnchor(4);
    Elisabeth_Reber_cssAnchor.group.add(Elisabeth_Reber_textObj);

    // handle buttons
    Elisabeth_Reber_leftIcon.userData.clickable = true;
    Elisabeth_Reber_rightIcon.userData.clickable = true;
    Elisabeth_Reber_portfolioItem0.userData.clickable = true;
    Elisabeth_Reber_portfolioItem0V.userData.clickable = true;

    const Elisabeth_Reber_portfolioItems = [Elisabeth_Reber_portfolioItem0, Elisabeth_Reber_portfolioItem1]; 
    let Elisabeth_Reber_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Elisabeth_Reber_leftIcon || o === Elisabeth_Reber_rightIcon) {
	    if (o === Elisabeth_Reber_leftIcon) {
	      Elisabeth_Reber_currentPortfolio = (Elisabeth_Reber_currentPortfolio - 1 + Elisabeth_Reber_portfolioItems.length) % Elisabeth_Reber_portfolioItems.length;
	    } else {
	      Elisabeth_Reber_currentPortfolio = (Elisabeth_Reber_currentPortfolio + 1) % Elisabeth_Reber_portfolioItems.length;
	    }
	    Elisabeth_Reber_portfolioItem0Video.pause();
	    for (let i = 0; i < Elisabeth_Reber_portfolioItems.length; i++) {
	      Elisabeth_Reber_portfolioGroup.remove(Elisabeth_Reber_portfolioItems[i]);
	    }
	    Elisabeth_Reber_portfolioGroup.add(Elisabeth_Reber_portfolioItems[Elisabeth_Reber_currentPortfolio]);
	  } else if (o === Elisabeth_Reber_portfolioItem0) {
	    Elisabeth_Reber_portfolioGroup.remove(Elisabeth_Reber_portfolioItem0);
	    Elisabeth_Reber_portfolioGroup.add(Elisabeth_Reber_portfolioItem0V);
	    Elisabeth_Reber_portfolioItems[0] = Elisabeth_Reber_portfolioItem0V;
	    Elisabeth_Reber_portfolioItem0Video.play();
	  } else if (o === Elisabeth_Reber_portfolioItem0V) {
	    if (Elisabeth_Reber_portfolioItem0Video.paused) {
	      Elisabeth_Reber_portfolioItem0Video.play();
	    } else {
	      Elisabeth_Reber_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// JJ_Koechlin
	const [
      JJ_Koechlin_leftTexture,
      JJ_Koechlin_rightTexture,
      JJ_Koechlin_portfolioItem0Texture,
      JJ_Koechlin_portfolioItem1Texture,
      JJ_Koechlin_portfolioItem2Texture,
      JJ_Koechlin_portfolioItem3Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/JJ_Koechlin_01.jpg',
      './images/JJ_Koechlin_02.jpg',
      './images/JJ_Koechlin_03.jpg',
      './images/JJ_Koechlin_02_b.jpg',
    ]);

    const JJ_Koechlin_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const JJ_Koechlin_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const JJ_Koechlin_leftMaterial = new THREE.MeshBasicMaterial({map: JJ_Koechlin_leftTexture});
    const JJ_Koechlin_rightMaterial = new THREE.MeshBasicMaterial({map: JJ_Koechlin_rightTexture});
    const JJ_Koechlin_leftIcon = new THREE.Mesh(JJ_Koechlin_iconGeometry, JJ_Koechlin_leftMaterial);
    const JJ_Koechlin_rightIcon = new THREE.Mesh(JJ_Koechlin_iconGeometry, JJ_Koechlin_rightMaterial);

    const JJ_Koechlin_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    JJ_Koechlin_portfolioItem0Video.muted = true;
    const JJ_Koechlin_portfolioItem0VideoTexture = new THREE.VideoTexture(JJ_Koechlin_portfolioItem0Video);
    const JJ_Koechlin_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: JJ_Koechlin_portfolioItem0VideoTexture});
    const JJ_Koechlin_portfolioItem0Material = new THREE.MeshBasicMaterial({map: JJ_Koechlin_portfolioItem0Texture});
    const JJ_Koechlin_portfolioItem1Material = new THREE.MeshBasicMaterial({map: JJ_Koechlin_portfolioItem1Texture});
    const JJ_Koechlin_portfolioItem2Material = new THREE.MeshBasicMaterial({map: JJ_Koechlin_portfolioItem2Texture});
    const JJ_Koechlin_portfolioItem3Material = new THREE.MeshBasicMaterial({map: JJ_Koechlin_portfolioItem3Texture});

    const JJ_Koechlin_portfolioItem0V = new THREE.Mesh(JJ_Koechlin_planeGeometry, JJ_Koechlin_portfolioItem0VideoMaterial); 
    const JJ_Koechlin_portfolioItem0 = new THREE.Mesh(JJ_Koechlin_planeGeometry, JJ_Koechlin_portfolioItem0Material); 
    const JJ_Koechlin_portfolioItem1 = new THREE.Mesh(JJ_Koechlin_planeGeometry, JJ_Koechlin_portfolioItem1Material); 
    const JJ_Koechlin_portfolioItem2 = new THREE.Mesh(JJ_Koechlin_planeGeometry, JJ_Koechlin_portfolioItem2Material); 
    const JJ_Koechlin_portfolioItem3 = new THREE.Mesh(JJ_Koechlin_planeGeometry, JJ_Koechlin_portfolioItem3Material); 


    const JJ_Koechlin_portfolioGroup = new THREE.Group();
    JJ_Koechlin_portfolioGroup.position.set(0, 0, -0.01);
    JJ_Koechlin_portfolioGroup.position.set(0, 0.6, -0.01);

    JJ_Koechlin_portfolioGroup.add(JJ_Koechlin_portfolioItem0);
    JJ_Koechlin_portfolioGroup.add(JJ_Koechlin_leftIcon);
    JJ_Koechlin_portfolioGroup.add(JJ_Koechlin_rightIcon);
    JJ_Koechlin_leftIcon.position.set(-0.7, 0, 0);
    JJ_Koechlin_rightIcon.position.set(0.7, 0, 0);

    const JJ_Koechlin_anchor = mindarThree.addAnchor(5);
    JJ_Koechlin_anchor.group.add(JJ_Koechlin_portfolioGroup);

    const JJ_Koechlin_textElement = document.createElement("div");
    const JJ_Koechlin_textObj = new CSS3DObject(JJ_Koechlin_textElement);
    JJ_Koechlin_textObj.position.set(0, -1000, 0);
    JJ_Koechlin_textObj.visible = false;
    JJ_Koechlin_textElement.style.background = "#FFFFFF";
    JJ_Koechlin_textElement.style.padding = "30px";
    JJ_Koechlin_textElement.style.fontSize = "60px";

    const JJ_Koechlin_cssAnchor = mindarThree.addCSSAnchor(5);
    JJ_Koechlin_cssAnchor.group.add(JJ_Koechlin_textObj);

    // handle buttons
    JJ_Koechlin_leftIcon.userData.clickable = true;
    JJ_Koechlin_rightIcon.userData.clickable = true;
    JJ_Koechlin_portfolioItem0.userData.clickable = true;
    JJ_Koechlin_portfolioItem0V.userData.clickable = true;

    const JJ_Koechlin_portfolioItems = [JJ_Koechlin_portfolioItem0, JJ_Koechlin_portfolioItem1, JJ_Koechlin_portfolioItem2, JJ_Koechlin_portfolioItem3]; 
    let JJ_Koechlin_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === JJ_Koechlin_leftIcon || o === JJ_Koechlin_rightIcon) {
	    if (o === JJ_Koechlin_leftIcon) {
	      JJ_Koechlin_currentPortfolio = (JJ_Koechlin_currentPortfolio - 1 + JJ_Koechlin_portfolioItems.length) % JJ_Koechlin_portfolioItems.length;
	    } else {
	      JJ_Koechlin_currentPortfolio = (JJ_Koechlin_currentPortfolio + 1) % JJ_Koechlin_portfolioItems.length;
	    }
	    JJ_Koechlin_portfolioItem0Video.pause();
	    for (let i = 0; i < JJ_Koechlin_portfolioItems.length; i++) {
	      JJ_Koechlin_portfolioGroup.remove(JJ_Koechlin_portfolioItems[i]);
	    }
	    JJ_Koechlin_portfolioGroup.add(JJ_Koechlin_portfolioItems[JJ_Koechlin_currentPortfolio]);
	  } else if (o === JJ_Koechlin_portfolioItem0) {
	    JJ_Koechlin_portfolioGroup.remove(JJ_Koechlin_portfolioItem0);
	    JJ_Koechlin_portfolioGroup.add(JJ_Koechlin_portfolioItem0V);
	    JJ_Koechlin_portfolioItems[0] = JJ_Koechlin_portfolioItem0V;
	    JJ_Koechlin_portfolioItem0Video.play();
	  } else if (o === JJ_Koechlin_portfolioItem0V) {
	    if (JJ_Koechlin_portfolioItem0Video.paused) {
	      JJ_Koechlin_portfolioItem0Video.play();
	    } else {
	      JJ_Koechlin_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Jean Dollfus
	const [
      Jean_Dollfus_leftTexture,
      Jean_Dollfus_rightTexture,
      Jean_Dollfus_portfolioItem0Texture,
      Jean_Dollfus_portfolioItem1Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Jean_Dollfus_01.jpg',
      './images/Jean_Dollfus_02.jpg',
    ]);

    const Jean_Dollfus_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Jean_Dollfus_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Jean_Dollfus_leftMaterial = new THREE.MeshBasicMaterial({map: Jean_Dollfus_leftTexture});
    const Jean_Dollfus_rightMaterial = new THREE.MeshBasicMaterial({map: Jean_Dollfus_rightTexture});
    const Jean_Dollfus_leftIcon = new THREE.Mesh(Jean_Dollfus_iconGeometry, Jean_Dollfus_leftMaterial);
    const Jean_Dollfus_rightIcon = new THREE.Mesh(Jean_Dollfus_iconGeometry, Jean_Dollfus_rightMaterial);

    const Jean_Dollfus_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Jean_Dollfus_portfolioItem0Video.muted = true;
    const Jean_Dollfus_portfolioItem0VideoTexture = new THREE.VideoTexture(Jean_Dollfus_portfolioItem0Video);
    const Jean_Dollfus_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Jean_Dollfus_portfolioItem0VideoTexture});
    const Jean_Dollfus_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Jean_Dollfus_portfolioItem0Texture});
    const Jean_Dollfus_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Jean_Dollfus_portfolioItem1Texture});

    const Jean_Dollfus_portfolioItem0V = new THREE.Mesh(Jean_Dollfus_planeGeometry, Jean_Dollfus_portfolioItem0VideoMaterial); 
    const Jean_Dollfus_portfolioItem0 = new THREE.Mesh(Jean_Dollfus_planeGeometry, Jean_Dollfus_portfolioItem0Material); 
    const Jean_Dollfus_portfolioItem1 = new THREE.Mesh(Jean_Dollfus_planeGeometry, Jean_Dollfus_portfolioItem1Material); 


    const Jean_Dollfus_portfolioGroup = new THREE.Group();
    Jean_Dollfus_portfolioGroup.position.set(0, 0, -0.01);
    Jean_Dollfus_portfolioGroup.position.set(0, 0.6, -0.01);

    Jean_Dollfus_portfolioGroup.add(Jean_Dollfus_portfolioItem0);
    Jean_Dollfus_portfolioGroup.add(Jean_Dollfus_leftIcon);
    Jean_Dollfus_portfolioGroup.add(Jean_Dollfus_rightIcon);
    Jean_Dollfus_leftIcon.position.set(-0.7, 0, 0);
    Jean_Dollfus_rightIcon.position.set(0.7, 0, 0);

    const Jean_Dollfus_anchor = mindarThree.addAnchor(6);
    Jean_Dollfus_anchor.group.add(Jean_Dollfus_portfolioGroup);

    const Jean_Dollfus_textElement = document.createElement("div");
    const Jean_Dollfus_textObj = new CSS3DObject(Jean_Dollfus_textElement);
    Jean_Dollfus_textObj.position.set(0, -1000, 0);
    Jean_Dollfus_textObj.visible = false;
    Jean_Dollfus_textElement.style.background = "#FFFFFF";
    Jean_Dollfus_textElement.style.padding = "30px";
    Jean_Dollfus_textElement.style.fontSize = "60px";

    const Jean_Dollfus_cssAnchor = mindarThree.addCSSAnchor(6);
    Jean_Dollfus_cssAnchor.group.add(Jean_Dollfus_textObj);

    // handle buttons
    Jean_Dollfus_leftIcon.userData.clickable = true;
    Jean_Dollfus_rightIcon.userData.clickable = true;
    Jean_Dollfus_portfolioItem0.userData.clickable = true;
    Jean_Dollfus_portfolioItem0V.userData.clickable = true;

    const Jean_Dollfus_portfolioItems = [Jean_Dollfus_portfolioItem0, Jean_Dollfus_portfolioItem1]; 
    let Jean_Dollfus_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Jean_Dollfus_leftIcon || o === Jean_Dollfus_rightIcon) {
	    if (o === Jean_Dollfus_leftIcon) {
	      Jean_Dollfus_currentPortfolio = (Jean_Dollfus_currentPortfolio - 1 + Jean_Dollfus_portfolioItems.length) % Jean_Dollfus_portfolioItems.length;
	    } else {
	      Jean_Dollfus_currentPortfolio = (Jean_Dollfus_currentPortfolio + 1) % Jean_Dollfus_portfolioItems.length;
	    }
	    Jean_Dollfus_portfolioItem0Video.pause();
	    for (let i = 0; i < Jean_Dollfus_portfolioItems.length; i++) {
	      Jean_Dollfus_portfolioGroup.remove(Jean_Dollfus_portfolioItems[i]);
	    }
	    Jean_Dollfus_portfolioGroup.add(Jean_Dollfus_portfolioItems[Jean_Dollfus_currentPortfolio]);
	  } else if (o === Jean_Dollfus_portfolioItem0) {
	    Jean_Dollfus_portfolioGroup.remove(Jean_Dollfus_portfolioItem0);
	    Jean_Dollfus_portfolioGroup.add(Jean_Dollfus_portfolioItem0V);
	    Jean_Dollfus_portfolioItems[0] = Jean_Dollfus_portfolioItem0V;
	    Jean_Dollfus_portfolioItem0Video.play();
	  } else if (o === Jean_Dollfus_portfolioItem0V) {
	    if (Jean_Dollfus_portfolioItem0Video.paused) {
	      Jean_Dollfus_portfolioItem0Video.play();
	    } else {
	      Jean_Dollfus_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });

	
// Jean Georges Dollfus
	const [
      Jean_Georges_Dollfus_leftTexture,
      Jean_Georges_Dollfus_rightTexture,
      Jean_Georges_Dollfus_portfolioItem0Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Jean_Georges_Dollfus_01.jpg',
    ]);

    const Jean_Georges_Dollfus_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Jean_Georges_Dollfus_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Jean_Georges_Dollfus_leftMaterial = new THREE.MeshBasicMaterial({map: Jean_Georges_Dollfus_leftTexture});
    const Jean_Georges_Dollfus_rightMaterial = new THREE.MeshBasicMaterial({map: Jean_Georges_Dollfus_rightTexture});
    const Jean_Georges_Dollfus_leftIcon = new THREE.Mesh(Jean_Georges_Dollfus_iconGeometry, Jean_Georges_Dollfus_leftMaterial);
    const Jean_Georges_Dollfus_rightIcon = new THREE.Mesh(Jean_Georges_Dollfus_iconGeometry, Jean_Georges_Dollfus_rightMaterial);

    const Jean_Georges_Dollfus_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Jean_Georges_Dollfus_portfolioItem0Video.muted = true;
    const Jean_Georges_Dollfus_portfolioItem0VideoTexture = new THREE.VideoTexture(Jean_Georges_Dollfus_portfolioItem0Video);
    const Jean_Georges_Dollfus_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Jean_Georges_Dollfus_portfolioItem0VideoTexture});
    const Jean_Georges_Dollfus_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Jean_Georges_Dollfus_portfolioItem0Texture});

    const Jean_Georges_Dollfus_portfolioItem0V = new THREE.Mesh(Jean_Georges_Dollfus_planeGeometry, Jean_Georges_Dollfus_portfolioItem0VideoMaterial); 
    const Jean_Georges_Dollfus_portfolioItem0 = new THREE.Mesh(Jean_Georges_Dollfus_planeGeometry, Jean_Georges_Dollfus_portfolioItem0Material);


    const Jean_Georges_Dollfus_portfolioGroup = new THREE.Group();
    Jean_Georges_Dollfus_portfolioGroup.position.set(0, 0, -0.01);
    Jean_Georges_Dollfus_portfolioGroup.position.set(0, 0.6, -0.01);

    Jean_Georges_Dollfus_portfolioGroup.add(Jean_Georges_Dollfus_portfolioItem0);
    Jean_Georges_Dollfus_portfolioGroup.add(Jean_Georges_Dollfus_leftIcon);
    Jean_Georges_Dollfus_portfolioGroup.add(Jean_Georges_Dollfus_rightIcon);
    Jean_Georges_Dollfus_leftIcon.position.set(-0.7, 0, 0);
    Jean_Georges_Dollfus_rightIcon.position.set(0.7, 0, 0);

    const Jean_Georges_Dollfus_anchor = mindarThree.addAnchor(7);
    Jean_Georges_Dollfus_anchor.group.add(Jean_Georges_Dollfus_portfolioGroup);

    const Jean_Georges_Dollfus_textElement = document.createElement("div");
    const Jean_Georges_Dollfus_textObj = new CSS3DObject(Jean_Georges_Dollfus_textElement);
    Jean_Georges_Dollfus_textObj.position.set(0, -1000, 0);
    Jean_Georges_Dollfus_textObj.visible = false;
    Jean_Georges_Dollfus_textElement.style.background = "#FFFFFF";
    Jean_Georges_Dollfus_textElement.style.padding = "30px";
    Jean_Georges_Dollfus_textElement.style.fontSize = "60px";

    const Jean_Georges_Dollfus_cssAnchor = mindarThree.addCSSAnchor(7);
    Jean_Georges_Dollfus_cssAnchor.group.add(Jean_Georges_Dollfus_textObj);

    // handle buttons
    Jean_Georges_Dollfus_leftIcon.userData.clickable = true;
    Jean_Georges_Dollfus_rightIcon.userData.clickable = true;
    Jean_Georges_Dollfus_portfolioItem0.userData.clickable = true;
    Jean_Georges_Dollfus_portfolioItem0V.userData.clickable = true;

    const Jean_Georges_Dollfus_portfolioItems = [Jean_Georges_Dollfus_portfolioItem0]; 
    let Jean_Georges_Dollfus_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Jean_Georges_Dollfus_leftIcon || o === Jean_Georges_Dollfus_rightIcon) {
	    if (o === Jean_Georges_Dollfus_leftIcon) {
	      Jean_Georges_Dollfus_currentPortfolio = (Jean_Georges_Dollfus_currentPortfolio - 1 + Jean_Georges_Dollfus_portfolioItems.length) % Jean_Georges_Dollfus_portfolioItems.length;
	    } else {
	      Jean_Georges_Dollfus_currentPortfolio = (Jean_Georges_Dollfus_currentPortfolio + 1) % Jean_Georges_Dollfus_portfolioItems.length;
	    }
	    Jean_Georges_Dollfus_portfolioItem0Video.pause();
	    for (let i = 0; i < Jean_Georges_Dollfus_portfolioItems.length; i++) {
	      Jean_Georges_Dollfus_portfolioGroup.remove(Jean_Georges_Dollfus_portfolioItems[i]);
	    }
	    Jean_Georges_Dollfus_portfolioGroup.add(Jean_Georges_Dollfus_portfolioItems[Jean_Georges_Dollfus_currentPortfolio]);
	  } else if (o === Jean_Georges_Dollfus_portfolioItem0) {
	    Jean_Georges_Dollfus_portfolioGroup.remove(Jean_Georges_Dollfus_portfolioItem0);
	    Jean_Georges_Dollfus_portfolioGroup.add(Jean_Georges_Dollfus_portfolioItem0V);
	    Jean_Georges_Dollfus_portfolioItems[0] = Jean_Georges_Dollfus_portfolioItem0V;
	    Jean_Georges_Dollfus_portfolioItem0Video.play();
	  } else if (o === Jean_Georges_Dollfus_portfolioItem0V) {
	    if (Jean_Georges_Dollfus_portfolioItem0Video.paused) {
	      Jean_Georges_Dollfus_portfolioItem0Video.play();
	    } else {
	      Jean_Georges_Dollfus_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });

	
// Jean Henri Dollfus
	const [
      Jean_Henri_Dollfus_leftTexture,
      Jean_Henri_Dollfus_rightTexture,
      Jean_Henri_Dollfus_portfolioItem0Texture,
      Jean_Henri_Dollfus_portfolioItem1Texture,
      Jean_Henri_Dollfus_portfolioItem2Texture,
	  Jean_Henri_Dollfus_portfolioItem3Texture,
	  Jean_Henri_Dollfus_portfolioItem4Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Jean_Henri_Dollfus_01.jpg',
      './images/Jean_Henri_Dollfus_02.jpg',
      './images/Jean_Henri_Dollfus_03.jpg',
      './images/Jean_Henri_Dollfus_04.jpg',
      './images/Jean_Henri_Dollfus_05.jpg',
    ]);

    const Jean_Henri_Dollfus_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Jean_Henri_Dollfus_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Jean_Henri_Dollfus_leftMaterial = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_leftTexture});
    const Jean_Henri_Dollfus_rightMaterial = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_rightTexture});
    const Jean_Henri_Dollfus_leftIcon = new THREE.Mesh(Jean_Henri_Dollfus_iconGeometry, Jean_Henri_Dollfus_leftMaterial);
    const Jean_Henri_Dollfus_rightIcon = new THREE.Mesh(Jean_Henri_Dollfus_iconGeometry, Jean_Henri_Dollfus_rightMaterial);

    const Jean_Henri_Dollfus_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Jean_Henri_Dollfus_portfolioItem0Video.muted = true;
    const Jean_Henri_Dollfus_portfolioItem0VideoTexture = new THREE.VideoTexture(Jean_Henri_Dollfus_portfolioItem0Video);
    const Jean_Henri_Dollfus_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem0VideoTexture});
    const Jean_Henri_Dollfus_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem0Texture});
    const Jean_Henri_Dollfus_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem1Texture});
    const Jean_Henri_Dollfus_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem2Texture});
	const Jean_Henri_Dollfus_portfolioItem3Material = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem3Texture});
	const Jean_Henri_Dollfus_portfolioItem4Material = new THREE.MeshBasicMaterial({map: Jean_Henri_Dollfus_portfolioItem4Texture});

    const Jean_Henri_Dollfus_portfolioItem0V = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem0VideoMaterial); 
    const Jean_Henri_Dollfus_portfolioItem0 = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem0Material); 
    const Jean_Henri_Dollfus_portfolioItem1 = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem1Material); 
    const Jean_Henri_Dollfus_portfolioItem2 = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem2Material); 
	const Jean_Henri_Dollfus_portfolioItem3 = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem3Material); 
	const Jean_Henri_Dollfus_portfolioItem4 = new THREE.Mesh(Jean_Henri_Dollfus_planeGeometry, Jean_Henri_Dollfus_portfolioItem4Material); 


    const Jean_Henri_Dollfus_portfolioGroup = new THREE.Group();
    Jean_Henri_Dollfus_portfolioGroup.position.set(0, 0, -0.01);
    Jean_Henri_Dollfus_portfolioGroup.position.set(0, 0.6, -0.01);

    Jean_Henri_Dollfus_portfolioGroup.add(Jean_Henri_Dollfus_portfolioItem0);
    Jean_Henri_Dollfus_portfolioGroup.add(Jean_Henri_Dollfus_leftIcon);
    Jean_Henri_Dollfus_portfolioGroup.add(Jean_Henri_Dollfus_rightIcon);
    Jean_Henri_Dollfus_leftIcon.position.set(-0.7, 0, 0);
    Jean_Henri_Dollfus_rightIcon.position.set(0.7, 0, 0);

    const Jean_Henri_Dollfus_anchor = mindarThree.addAnchor(8);
    Jean_Henri_Dollfus_anchor.group.add(Jean_Henri_Dollfus_portfolioGroup);

    const Jean_Henri_Dollfus_textElement = document.createElement("div");
    const Jean_Henri_Dollfus_textObj = new CSS3DObject(Jean_Henri_Dollfus_textElement);
    Jean_Henri_Dollfus_textObj.position.set(0, -1000, 0);
    Jean_Henri_Dollfus_textObj.visible = false;
    Jean_Henri_Dollfus_textElement.style.background = "#FFFFFF";
    Jean_Henri_Dollfus_textElement.style.padding = "30px";
    Jean_Henri_Dollfus_textElement.style.fontSize = "60px";

    const Jean_Henri_Dollfus_cssAnchor = mindarThree.addCSSAnchor(8);
    Jean_Henri_Dollfus_cssAnchor.group.add(Jean_Henri_Dollfus_textObj);

    // handle buttons
    Jean_Henri_Dollfus_leftIcon.userData.clickable = true;
    Jean_Henri_Dollfus_rightIcon.userData.clickable = true;
    Jean_Henri_Dollfus_portfolioItem0.userData.clickable = true;
    Jean_Henri_Dollfus_portfolioItem0V.userData.clickable = true;

    const Jean_Henri_Dollfus_portfolioItems = [Jean_Henri_Dollfus_portfolioItem0, Jean_Henri_Dollfus_portfolioItem1, Jean_Henri_Dollfus_portfolioItem2, Jean_Henri_Dollfus_portfolioItem3, Jean_Henri_Dollfus_portfolioItem4]; 
    let Jean_Henri_Dollfus_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Jean_Henri_Dollfus_leftIcon || o === Jean_Henri_Dollfus_rightIcon) {
	    if (o === Jean_Henri_Dollfus_leftIcon) {
	      Jean_Henri_Dollfus_currentPortfolio = (Jean_Henri_Dollfus_currentPortfolio - 1 + Jean_Henri_Dollfus_portfolioItems.length) % Jean_Henri_Dollfus_portfolioItems.length;
	    } else {
	      Jean_Henri_Dollfus_currentPortfolio = (Jean_Henri_Dollfus_currentPortfolio + 1) % Jean_Henri_Dollfus_portfolioItems.length;
	    }
	    Jean_Henri_Dollfus_portfolioItem0Video.pause();
	    for (let i = 0; i < Jean_Henri_Dollfus_portfolioItems.length; i++) {
	      Jean_Henri_Dollfus_portfolioGroup.remove(Jean_Henri_Dollfus_portfolioItems[i]);
	    }
	    Jean_Henri_Dollfus_portfolioGroup.add(Jean_Henri_Dollfus_portfolioItems[Jean_Henri_Dollfus_currentPortfolio]);
	  } else if (o === Jean_Henri_Dollfus_portfolioItem0) {
	    Jean_Henri_Dollfus_portfolioGroup.remove(Jean_Henri_Dollfus_portfolioItem0);
	    Jean_Henri_Dollfus_portfolioGroup.add(Jean_Henri_Dollfus_portfolioItem0V);
	    Jean_Henri_Dollfus_portfolioItems[0] = Jean_Henri_Dollfus_portfolioItem0V;
	    Jean_Henri_Dollfus_portfolioItem0Video.play();
	  } else if (o === Jean_Henri_Dollfus_portfolioItem0V) {
	    if (Jean_Henri_Dollfus_portfolioItem0Video.paused) {
	      Jean_Henri_Dollfus_portfolioItem0Video.play();
	    } else {
	      Jean_Henri_Dollfus_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });

	
// Jean Koechlin
	const [
      Jean_Koechlin_leftTexture,
      Jean_Koechlin_rightTexture,
      Jean_Koechlin_portfolioItem0Texture,
      Jean_Koechlin_portfolioItem1Texture,
      Jean_Koechlin_portfolioItem2Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Jean_Koechlin_01.jpg',
      './images/Jean_Koechlin_02.jpg',
      './images/Jean_Koechlin_03.jpg',
    ]);

    const Jean_Koechlin_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Jean_Koechlin_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Jean_Koechlin_leftMaterial = new THREE.MeshBasicMaterial({map: Jean_Koechlin_leftTexture});
    const Jean_Koechlin_rightMaterial = new THREE.MeshBasicMaterial({map: Jean_Koechlin_rightTexture});
    const Jean_Koechlin_leftIcon = new THREE.Mesh(Jean_Koechlin_iconGeometry, Jean_Koechlin_leftMaterial);
    const Jean_Koechlin_rightIcon = new THREE.Mesh(Jean_Koechlin_iconGeometry, Jean_Koechlin_rightMaterial);

    const Jean_Koechlin_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Jean_Koechlin_portfolioItem0Video.muted = true;
    const Jean_Koechlin_portfolioItem0VideoTexture = new THREE.VideoTexture(Jean_Koechlin_portfolioItem0Video);
    const Jean_Koechlin_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Jean_Koechlin_portfolioItem0VideoTexture});
    const Jean_Koechlin_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Jean_Koechlin_portfolioItem0Texture});
    const Jean_Koechlin_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Jean_Koechlin_portfolioItem1Texture});
    const Jean_Koechlin_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Jean_Koechlin_portfolioItem2Texture});

    const Jean_Koechlin_portfolioItem0V = new THREE.Mesh(Jean_Koechlin_planeGeometry, Jean_Koechlin_portfolioItem0VideoMaterial); 
    const Jean_Koechlin_portfolioItem0 = new THREE.Mesh(Jean_Koechlin_planeGeometry, Jean_Koechlin_portfolioItem0Material); 
    const Jean_Koechlin_portfolioItem1 = new THREE.Mesh(Jean_Koechlin_planeGeometry, Jean_Koechlin_portfolioItem1Material); 
    const Jean_Koechlin_portfolioItem2 = new THREE.Mesh(Jean_Koechlin_planeGeometry, Jean_Koechlin_portfolioItem2Material); 


    const Jean_Koechlin_portfolioGroup = new THREE.Group();
    Jean_Koechlin_portfolioGroup.position.set(0, 0, -0.01);
    Jean_Koechlin_portfolioGroup.position.set(0, 0.6, -0.01);

    Jean_Koechlin_portfolioGroup.add(Jean_Koechlin_portfolioItem0);
    Jean_Koechlin_portfolioGroup.add(Jean_Koechlin_leftIcon);
    Jean_Koechlin_portfolioGroup.add(Jean_Koechlin_rightIcon);
    Jean_Koechlin_leftIcon.position.set(-0.7, 0, 0);
    Jean_Koechlin_rightIcon.position.set(0.7, 0, 0);

    const Jean_Koechlin_anchor = mindarThree.addAnchor(9);
    Jean_Koechlin_anchor.group.add(Jean_Koechlin_portfolioGroup);

    const Jean_Koechlin_textElement = document.createElement("div");
    const Jean_Koechlin_textObj = new CSS3DObject(Jean_Koechlin_textElement);
    Jean_Koechlin_textObj.position.set(0, -1000, 0);
    Jean_Koechlin_textObj.visible = false;
    Jean_Koechlin_textElement.style.background = "#FFFFFF";
    Jean_Koechlin_textElement.style.padding = "30px";
    Jean_Koechlin_textElement.style.fontSize = "60px";

    const Jean_Koechlin_cssAnchor = mindarThree.addCSSAnchor(9);
    Jean_Koechlin_cssAnchor.group.add(Jean_Koechlin_textObj);

    // handle buttons
    Jean_Koechlin_leftIcon.userData.clickable = true;
    Jean_Koechlin_rightIcon.userData.clickable = true;
    Jean_Koechlin_portfolioItem0.userData.clickable = true;
    Jean_Koechlin_portfolioItem0V.userData.clickable = true;

    const Jean_Koechlin_portfolioItems = [Jean_Koechlin_portfolioItem0, Jean_Koechlin_portfolioItem1, Jean_Koechlin_portfolioItem2]; 
    let Jean_Koechlin_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Jean_Koechlin_leftIcon || o === Jean_Koechlin_rightIcon) {
	    if (o === Jean_Koechlin_leftIcon) {
	      Jean_Koechlin_currentPortfolio = (Jean_Koechlin_currentPortfolio - 1 + Jean_Koechlin_portfolioItems.length) % Jean_Koechlin_portfolioItems.length;
	    } else {
	      Jean_Koechlin_currentPortfolio = (Jean_Koechlin_currentPortfolio + 1) % Jean_Koechlin_portfolioItems.length;
	    }
	    Jean_Koechlin_portfolioItem0Video.pause();
	    for (let i = 0; i < Jean_Koechlin_portfolioItems.length; i++) {
	      Jean_Koechlin_portfolioGroup.remove(Jean_Koechlin_portfolioItems[i]);
	    }
	    Jean_Koechlin_portfolioGroup.add(Jean_Koechlin_portfolioItems[Jean_Koechlin_currentPortfolio]);
	  } else if (o === Jean_Koechlin_portfolioItem0) {
	    Jean_Koechlin_portfolioGroup.remove(Jean_Koechlin_portfolioItem0);
	    Jean_Koechlin_portfolioGroup.add(Jean_Koechlin_portfolioItem0V);
	    Jean_Koechlin_portfolioItems[0] = Jean_Koechlin_portfolioItem0V;
	    Jean_Koechlin_portfolioItem0Video.play();
	  } else if (o === Jean_Koechlin_portfolioItem0V) {
	    if (Jean_Koechlin_portfolioItem0Video.paused) {
	      Jean_Koechlin_portfolioItem0Video.play();
	    } else {
	      Jean_Koechlin_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });


// Marguerite Hoffer
	const [
      Marguerite_Hoffer_leftTexture,
      Marguerite_Hoffer_rightTexture,
      Marguerite_Hoffer_portfolioItem0Texture,
      Marguerite_Hoffer_portfolioItem1Texture,
      Marguerite_Hoffer_portfolioItem2Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/blank.png',
      './images/blank.png',
      './images/blank.png',
    ]);

    const Marguerite_Hoffer_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Marguerite_Hoffer_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Marguerite_Hoffer_leftMaterial = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_leftTexture});
    const Marguerite_Hoffer_rightMaterial = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_rightTexture});
    const Marguerite_Hoffer_leftIcon = new THREE.Mesh(Marguerite_Hoffer_iconGeometry, Marguerite_Hoffer_leftMaterial);
    const Marguerite_Hoffer_rightIcon = new THREE.Mesh(Marguerite_Hoffer_iconGeometry, Marguerite_Hoffer_rightMaterial);

    const Marguerite_Hoffer_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Marguerite_Hoffer_portfolioItem0Video.muted = true;
    const Marguerite_Hoffer_portfolioItem0VideoTexture = new THREE.VideoTexture(Marguerite_Hoffer_portfolioItem0Video);
    const Marguerite_Hoffer_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_portfolioItem0VideoTexture});
    const Marguerite_Hoffer_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_portfolioItem0Texture});
    const Marguerite_Hoffer_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_portfolioItem1Texture});
    const Marguerite_Hoffer_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Marguerite_Hoffer_portfolioItem2Texture});

    const Marguerite_Hoffer_portfolioItem0V = new THREE.Mesh(Marguerite_Hoffer_planeGeometry, Marguerite_Hoffer_portfolioItem0VideoMaterial); 
    const Marguerite_Hoffer_portfolioItem0 = new THREE.Mesh(Marguerite_Hoffer_planeGeometry, Marguerite_Hoffer_portfolioItem0Material); 
    const Marguerite_Hoffer_portfolioItem1 = new THREE.Mesh(Marguerite_Hoffer_planeGeometry, Marguerite_Hoffer_portfolioItem1Material); 
    const Marguerite_Hoffer_portfolioItem2 = new THREE.Mesh(Marguerite_Hoffer_planeGeometry, Marguerite_Hoffer_portfolioItem2Material); 


    const Marguerite_Hoffer_portfolioGroup = new THREE.Group();
    Marguerite_Hoffer_portfolioGroup.position.set(0, 0, -0.01);
    Marguerite_Hoffer_portfolioGroup.position.set(0, 0.6, -0.01);

    Marguerite_Hoffer_portfolioGroup.add(Marguerite_Hoffer_portfolioItem0);
    Marguerite_Hoffer_portfolioGroup.add(Marguerite_Hoffer_leftIcon);
    Marguerite_Hoffer_portfolioGroup.add(Marguerite_Hoffer_rightIcon);
    Marguerite_Hoffer_leftIcon.position.set(-0.7, 0, 0);
    Marguerite_Hoffer_rightIcon.position.set(0.7, 0, 0);

    const Marguerite_Hoffer_anchor = mindarThree.addAnchor(10);
    Marguerite_Hoffer_anchor.group.add(Marguerite_Hoffer_portfolioGroup);

    const Marguerite_Hoffer_textElement = document.createElement("div");
    const Marguerite_Hoffer_textObj = new CSS3DObject(Marguerite_Hoffer_textElement);
    Marguerite_Hoffer_textObj.position.set(0, -1000, 0);
    Marguerite_Hoffer_textObj.visible = false;
    Marguerite_Hoffer_textElement.style.background = "#FFFFFF";
    Marguerite_Hoffer_textElement.style.padding = "30px";
    Marguerite_Hoffer_textElement.style.fontSize = "60px";

    const Marguerite_Hoffer_cssAnchor = mindarThree.addCSSAnchor(10);
    Marguerite_Hoffer_cssAnchor.group.add(Marguerite_Hoffer_textObj);

    // handle buttons
    Marguerite_Hoffer_leftIcon.userData.clickable = true;
    Marguerite_Hoffer_rightIcon.userData.clickable = true;
    Marguerite_Hoffer_portfolioItem0.userData.clickable = true;
    Marguerite_Hoffer_portfolioItem0V.userData.clickable = true;

    const Marguerite_Hoffer_portfolioItems = [Marguerite_Hoffer_portfolioItem0, Marguerite_Hoffer_portfolioItem1, Marguerite_Hoffer_portfolioItem2]; 
    let Marguerite_Hoffer_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Marguerite_Hoffer_leftIcon || o === Marguerite_Hoffer_rightIcon) {
	    if (o === Marguerite_Hoffer_leftIcon) {
	      Marguerite_Hoffer_currentPortfolio = (Marguerite_Hoffer_currentPortfolio - 1 + Marguerite_Hoffer_portfolioItems.length) % Marguerite_Hoffer_portfolioItems.length;
	    } else {
	      Marguerite_Hoffer_currentPortfolio = (Marguerite_Hoffer_currentPortfolio + 1) % Marguerite_Hoffer_portfolioItems.length;
	    }
	    Marguerite_Hoffer_portfolioItem0Video.pause();
	    for (let i = 0; i < Marguerite_Hoffer_portfolioItems.length; i++) {
	      Marguerite_Hoffer_portfolioGroup.remove(Marguerite_Hoffer_portfolioItems[i]);
	    }
	    Marguerite_Hoffer_portfolioGroup.add(Marguerite_Hoffer_portfolioItems[Marguerite_Hoffer_currentPortfolio]);
	  } else if (o === Marguerite_Hoffer_portfolioItem0) {
	    Marguerite_Hoffer_portfolioGroup.remove(Marguerite_Hoffer_portfolioItem0);
	    Marguerite_Hoffer_portfolioGroup.add(Marguerite_Hoffer_portfolioItem0V);
	    Marguerite_Hoffer_portfolioItems[0] = Marguerite_Hoffer_portfolioItem0V;
	    Marguerite_Hoffer_portfolioItem0Video.play();
	  } else if (o === Marguerite_Hoffer_portfolioItem0V) {
	    if (Marguerite_Hoffer_portfolioItem0Video.paused) {
	      Marguerite_Hoffer_portfolioItem0Video.play();
	    } else {
	      Marguerite_Hoffer_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Marie Madeleine Mieg
	const [
      Marie_Madeleine_Mieg_leftTexture,
      Marie_Madeleine_Mieg_rightTexture,
      Marie_Madeleine_Mieg_portfolioItem0Texture,
      Marie_Madeleine_Mieg_portfolioItem1Texture,
      Marie_Madeleine_Mieg_portfolioItem2Texture,
	  Marie_Madeleine_Mieg_portfolioItem3Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Marie_Madeleine_Mieg_01.jpg',
      './images/Marie_Madeleine_Mieg_02.jpg',
      './images/Marie_Madeleine_Mieg_03.jpg',
      './images/Marie_Madeleine_Mieg_04.jpg',
    ]);

    const Marie_Madeleine_Mieg_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Marie_Madeleine_Mieg_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Marie_Madeleine_Mieg_leftMaterial = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_leftTexture});
    const Marie_Madeleine_Mieg_rightMaterial = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_rightTexture});
    const Marie_Madeleine_Mieg_leftIcon = new THREE.Mesh(Marie_Madeleine_Mieg_iconGeometry, Marie_Madeleine_Mieg_leftMaterial);
    const Marie_Madeleine_Mieg_rightIcon = new THREE.Mesh(Marie_Madeleine_Mieg_iconGeometry, Marie_Madeleine_Mieg_rightMaterial);

    const Marie_Madeleine_Mieg_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Marie_Madeleine_Mieg_portfolioItem0Video.muted = true;
    const Marie_Madeleine_Mieg_portfolioItem0VideoTexture = new THREE.VideoTexture(Marie_Madeleine_Mieg_portfolioItem0Video);
    const Marie_Madeleine_Mieg_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_portfolioItem0VideoTexture});
    const Marie_Madeleine_Mieg_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_portfolioItem0Texture});
    const Marie_Madeleine_Mieg_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_portfolioItem1Texture});
    const Marie_Madeleine_Mieg_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_portfolioItem2Texture});
	const Marie_Madeleine_Mieg_portfolioItem3Material = new THREE.MeshBasicMaterial({map: Marie_Madeleine_Mieg_portfolioItem3Texture});

    const Marie_Madeleine_Mieg_portfolioItem0V = new THREE.Mesh(Marie_Madeleine_Mieg_planeGeometry, Marie_Madeleine_Mieg_portfolioItem0VideoMaterial); 
    const Marie_Madeleine_Mieg_portfolioItem0 = new THREE.Mesh(Marie_Madeleine_Mieg_planeGeometry, Marie_Madeleine_Mieg_portfolioItem0Material); 
    const Marie_Madeleine_Mieg_portfolioItem1 = new THREE.Mesh(Marie_Madeleine_Mieg_planeGeometry, Marie_Madeleine_Mieg_portfolioItem1Material); 
    const Marie_Madeleine_Mieg_portfolioItem2 = new THREE.Mesh(Marie_Madeleine_Mieg_planeGeometry, Marie_Madeleine_Mieg_portfolioItem2Material); 
	const Marie_Madeleine_Mieg_portfolioItem3 = new THREE.Mesh(Marie_Madeleine_Mieg_planeGeometry, Marie_Madeleine_Mieg_portfolioItem3Material); 


    const Marie_Madeleine_Mieg_portfolioGroup = new THREE.Group();
    Marie_Madeleine_Mieg_portfolioGroup.position.set(0, 0, -0.01);
    Marie_Madeleine_Mieg_portfolioGroup.position.set(0, 0.6, -0.01);

    Marie_Madeleine_Mieg_portfolioGroup.add(Marie_Madeleine_Mieg_portfolioItem0);
    Marie_Madeleine_Mieg_portfolioGroup.add(Marie_Madeleine_Mieg_leftIcon);
    Marie_Madeleine_Mieg_portfolioGroup.add(Marie_Madeleine_Mieg_rightIcon);
    Marie_Madeleine_Mieg_leftIcon.position.set(-0.7, 0, 0);
    Marie_Madeleine_Mieg_rightIcon.position.set(0.7, 0, 0);

    const Marie_Madeleine_Mieg_anchor = mindarThree.addAnchor(11);
    Marie_Madeleine_Mieg_anchor.group.add(Marie_Madeleine_Mieg_portfolioGroup);

    const Marie_Madeleine_Mieg_textElement = document.createElement("div");
    const Marie_Madeleine_Mieg_textObj = new CSS3DObject(Marie_Madeleine_Mieg_textElement);
    Marie_Madeleine_Mieg_textObj.position.set(0, -1000, 0);
    Marie_Madeleine_Mieg_textObj.visible = false;
    Marie_Madeleine_Mieg_textElement.style.background = "#FFFFFF";
    Marie_Madeleine_Mieg_textElement.style.padding = "30px";
    Marie_Madeleine_Mieg_textElement.style.fontSize = "60px";

    const Marie_Madeleine_Mieg_cssAnchor = mindarThree.addCSSAnchor(11);
    Marie_Madeleine_Mieg_cssAnchor.group.add(Marie_Madeleine_Mieg_textObj);

    // handle buttons
    Marie_Madeleine_Mieg_leftIcon.userData.clickable = true;
    Marie_Madeleine_Mieg_rightIcon.userData.clickable = true;
    Marie_Madeleine_Mieg_portfolioItem0.userData.clickable = true;
    Marie_Madeleine_Mieg_portfolioItem0V.userData.clickable = true;

    const Marie_Madeleine_Mieg_portfolioItems = [Marie_Madeleine_Mieg_portfolioItem0, Marie_Madeleine_Mieg_portfolioItem1, Marie_Madeleine_Mieg_portfolioItem2, Marie_Madeleine_Mieg_portfolioItem3]; 
    let Marie_Madeleine_Mieg_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Marie_Madeleine_Mieg_leftIcon || o === Marie_Madeleine_Mieg_rightIcon) {
	    if (o === Marie_Madeleine_Mieg_leftIcon) {
	      Marie_Madeleine_Mieg_currentPortfolio = (Marie_Madeleine_Mieg_currentPortfolio - 1 + Marie_Madeleine_Mieg_portfolioItems.length) % Marie_Madeleine_Mieg_portfolioItems.length;
	    } else {
	      Marie_Madeleine_Mieg_currentPortfolio = (Marie_Madeleine_Mieg_currentPortfolio + 1) % Marie_Madeleine_Mieg_portfolioItems.length;
	    }
	    Marie_Madeleine_Mieg_portfolioItem0Video.pause();
	    for (let i = 0; i < Marie_Madeleine_Mieg_portfolioItems.length; i++) {
	      Marie_Madeleine_Mieg_portfolioGroup.remove(Marie_Madeleine_Mieg_portfolioItems[i]);
	    }
	    Marie_Madeleine_Mieg_portfolioGroup.add(Marie_Madeleine_Mieg_portfolioItems[Marie_Madeleine_Mieg_currentPortfolio]);
	  } else if (o === Marie_Madeleine_Mieg_portfolioItem0) {
	    Marie_Madeleine_Mieg_portfolioGroup.remove(Marie_Madeleine_Mieg_portfolioItem0);
	    Marie_Madeleine_Mieg_portfolioGroup.add(Marie_Madeleine_Mieg_portfolioItem0V);
	    Marie_Madeleine_Mieg_portfolioItems[0] = Marie_Madeleine_Mieg_portfolioItem0V;
	    Marie_Madeleine_Mieg_portfolioItem0Video.play();
	  } else if (o === Marie_Madeleine_Mieg_portfolioItem0V) {
	    if (Marie_Madeleine_Mieg_portfolioItem0Video.paused) {
	      Marie_Madeleine_Mieg_portfolioItem0Video.play();
	    } else {
	      Marie_Madeleine_Mieg_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Mathieu Mieg
	const [
      Mathieu_Mieg_leftTexture,
      Mathieu_Mieg_rightTexture,
      Mathieu_Mieg_portfolioItem0Texture,
      Mathieu_Mieg_portfolioItem1Texture,
      Mathieu_Mieg_portfolioItem2Texture,
      Mathieu_Mieg_portfolioItem3Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Mathieu_Mieg_01.jpg',
      './images/Mathieu_Mieg_02.jpg',
      './images/Mathieu_Mieg_03.jpg',
      './images/Mathieu_Mieg_03_b.jpg',
    ]);

    const Mathieu_Mieg_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Mathieu_Mieg_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Mathieu_Mieg_leftMaterial = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_leftTexture});
    const Mathieu_Mieg_rightMaterial = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_rightTexture});
    const Mathieu_Mieg_leftIcon = new THREE.Mesh(Mathieu_Mieg_iconGeometry, Mathieu_Mieg_leftMaterial);
    const Mathieu_Mieg_rightIcon = new THREE.Mesh(Mathieu_Mieg_iconGeometry, Mathieu_Mieg_rightMaterial);

    const Mathieu_Mieg_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Mathieu_Mieg_portfolioItem0Video.muted = true;
    const Mathieu_Mieg_portfolioItem0VideoTexture = new THREE.VideoTexture(Mathieu_Mieg_portfolioItem0Video);
    const Mathieu_Mieg_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_portfolioItem0VideoTexture});
    const Mathieu_Mieg_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_portfolioItem0Texture});
    const Mathieu_Mieg_portfolioItem1Material = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_portfolioItem1Texture});
    const Mathieu_Mieg_portfolioItem2Material = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_portfolioItem2Texture});
    const Mathieu_Mieg_portfolioItem3Material = new THREE.MeshBasicMaterial({map: Mathieu_Mieg_portfolioItem3Texture});

    const Mathieu_Mieg_portfolioItem0V = new THREE.Mesh(Mathieu_Mieg_planeGeometry, Mathieu_Mieg_portfolioItem0VideoMaterial); 
    const Mathieu_Mieg_portfolioItem0 = new THREE.Mesh(Mathieu_Mieg_planeGeometry, Mathieu_Mieg_portfolioItem0Material); 
    const Mathieu_Mieg_portfolioItem1 = new THREE.Mesh(Mathieu_Mieg_planeGeometry, Mathieu_Mieg_portfolioItem1Material); 
    const Mathieu_Mieg_portfolioItem2 = new THREE.Mesh(Mathieu_Mieg_planeGeometry, Mathieu_Mieg_portfolioItem2Material); 
    const Mathieu_Mieg_portfolioItem3 = new THREE.Mesh(Mathieu_Mieg_planeGeometry, Mathieu_Mieg_portfolioItem3Material);


    const Mathieu_Mieg_portfolioGroup = new THREE.Group();
    Mathieu_Mieg_portfolioGroup.position.set(0, 0, -0.01);
    Mathieu_Mieg_portfolioGroup.position.set(0, 0.6, -0.01);

    Mathieu_Mieg_portfolioGroup.add(Mathieu_Mieg_portfolioItem0);
    Mathieu_Mieg_portfolioGroup.add(Mathieu_Mieg_leftIcon);
    Mathieu_Mieg_portfolioGroup.add(Mathieu_Mieg_rightIcon);
    Mathieu_Mieg_leftIcon.position.set(-0.7, 0, 0);
    Mathieu_Mieg_rightIcon.position.set(0.7, 0, 0);

    const Mathieu_Mieg_anchor = mindarThree.addAnchor(12);
    Mathieu_Mieg_anchor.group.add(Mathieu_Mieg_portfolioGroup);

    const Mathieu_Mieg_textElement = document.createElement("div");
    const Mathieu_Mieg_textObj = new CSS3DObject(Mathieu_Mieg_textElement);
    Mathieu_Mieg_textObj.position.set(0, -1000, 0);
    Mathieu_Mieg_textObj.visible = false;
    Mathieu_Mieg_textElement.style.background = "#FFFFFF";
    Mathieu_Mieg_textElement.style.padding = "30px";
    Mathieu_Mieg_textElement.style.fontSize = "60px";

    const Mathieu_Mieg_cssAnchor = mindarThree.addCSSAnchor(12);
    Mathieu_Mieg_cssAnchor.group.add(Mathieu_Mieg_textObj);

    // handle buttons
    Mathieu_Mieg_leftIcon.userData.clickable = true;
    Mathieu_Mieg_rightIcon.userData.clickable = true;
    Mathieu_Mieg_portfolioItem0.userData.clickable = true;
    Mathieu_Mieg_portfolioItem0V.userData.clickable = true;

    const Mathieu_Mieg_portfolioItems = [Mathieu_Mieg_portfolioItem0, Mathieu_Mieg_portfolioItem1, Mathieu_Mieg_portfolioItem2, Mathieu_Mieg_portfolioItem3]; 
    let Mathieu_Mieg_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Mathieu_Mieg_leftIcon || o === Mathieu_Mieg_rightIcon) {
	    if (o === Mathieu_Mieg_leftIcon) {
	      Mathieu_Mieg_currentPortfolio = (Mathieu_Mieg_currentPortfolio - 1 + Mathieu_Mieg_portfolioItems.length) % Mathieu_Mieg_portfolioItems.length;
	    } else {
	      Mathieu_Mieg_currentPortfolio = (Mathieu_Mieg_currentPortfolio + 1) % Mathieu_Mieg_portfolioItems.length;
	    }
	    Mathieu_Mieg_portfolioItem0Video.pause();
	    for (let i = 0; i < Mathieu_Mieg_portfolioItems.length; i++) {
	      Mathieu_Mieg_portfolioGroup.remove(Mathieu_Mieg_portfolioItems[i]);
	    }
	    Mathieu_Mieg_portfolioGroup.add(Mathieu_Mieg_portfolioItems[Mathieu_Mieg_currentPortfolio]);
	  } else if (o === Mathieu_Mieg_portfolioItem0) {
	    Mathieu_Mieg_portfolioGroup.remove(Mathieu_Mieg_portfolioItem0);
	    Mathieu_Mieg_portfolioGroup.add(Mathieu_Mieg_portfolioItem0V);
	    Mathieu_Mieg_portfolioItems[0] = Mathieu_Mieg_portfolioItem0V;
	    Mathieu_Mieg_portfolioItem0Video.play();
	  } else if (o === Mathieu_Mieg_portfolioItem0V) {
	    if (Mathieu_Mieg_portfolioItem0Video.paused) {
	      Mathieu_Mieg_portfolioItem0Video.play();
	    } else {
	      Mathieu_Mieg_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	
// Salome Koechlin
	const [
      Salome_Koechlin_leftTexture,
      Salome_Koechlin_rightTexture,
      Salome_Koechlin_portfolioItem0Texture,
    ] = await loadTextures([
      './images/portfolio/icons/left.png',
      './images/portfolio/icons/right.png',
      './images/Salome_Koechlin_01.jpg',
    ]);

    const Salome_Koechlin_planeGeometry = new THREE.PlaneGeometry(1, 0.552);

    const Salome_Koechlin_iconGeometry = new THREE.CircleGeometry(0.075, 32);
    const Salome_Koechlin_leftMaterial = new THREE.MeshBasicMaterial({map: Salome_Koechlin_leftTexture});
    const Salome_Koechlin_rightMaterial = new THREE.MeshBasicMaterial({map: Salome_Koechlin_rightTexture});
    const Salome_Koechlin_leftIcon = new THREE.Mesh(Salome_Koechlin_iconGeometry, Salome_Koechlin_leftMaterial);
    const Salome_Koechlin_rightIcon = new THREE.Mesh(Salome_Koechlin_iconGeometry, Salome_Koechlin_rightMaterial);

    const Salome_Koechlin_portfolioItem0Video = await loadVideo("./images/portfolio/portfolio/paintandquest.mp4");
    Salome_Koechlin_portfolioItem0Video.muted = true;
    const Salome_Koechlin_portfolioItem0VideoTexture = new THREE.VideoTexture(Salome_Koechlin_portfolioItem0Video);
    const Salome_Koechlin_portfolioItem0VideoMaterial = new THREE.MeshBasicMaterial({map: Salome_Koechlin_portfolioItem0VideoTexture});
    const Salome_Koechlin_portfolioItem0Material = new THREE.MeshBasicMaterial({map: Salome_Koechlin_portfolioItem0Texture});

    const Salome_Koechlin_portfolioItem0V = new THREE.Mesh(Salome_Koechlin_planeGeometry, Salome_Koechlin_portfolioItem0VideoMaterial); 
    const Salome_Koechlin_portfolioItem0 = new THREE.Mesh(Salome_Koechlin_planeGeometry, Salome_Koechlin_portfolioItem0Material); 


    const Salome_Koechlin_portfolioGroup = new THREE.Group();
    Salome_Koechlin_portfolioGroup.position.set(0, 0, -0.01);
    Salome_Koechlin_portfolioGroup.position.set(0, 0.6, -0.01);

    Salome_Koechlin_portfolioGroup.add(Salome_Koechlin_portfolioItem0);
    Salome_Koechlin_portfolioGroup.add(Salome_Koechlin_leftIcon);
    Salome_Koechlin_portfolioGroup.add(Salome_Koechlin_rightIcon);
    Salome_Koechlin_leftIcon.position.set(-0.7, 0, 0);
    Salome_Koechlin_rightIcon.position.set(0.7, 0, 0);

    const Salome_Koechlin_anchor = mindarThree.addAnchor(13);
    Salome_Koechlin_anchor.group.add(Salome_Koechlin_portfolioGroup);

    const Salome_Koechlin_textElement = document.createElement("div");
    const Salome_Koechlin_textObj = new CSS3DObject(Salome_Koechlin_textElement);
    Salome_Koechlin_textObj.position.set(0, -1000, 0);
    Salome_Koechlin_textObj.visible = false;
    Salome_Koechlin_textElement.style.background = "#FFFFFF";
    Salome_Koechlin_textElement.style.padding = "30px";
    Salome_Koechlin_textElement.style.fontSize = "60px";

    const Salome_Koechlin_cssAnchor = mindarThree.addCSSAnchor(13);
    Salome_Koechlin_cssAnchor.group.add(Salome_Koechlin_textObj);

    // handle buttons
    Salome_Koechlin_leftIcon.userData.clickable = true;
    Salome_Koechlin_rightIcon.userData.clickable = true;
    Salome_Koechlin_portfolioItem0.userData.clickable = true;
    Salome_Koechlin_portfolioItem0V.userData.clickable = true;

    const Salome_Koechlin_portfolioItems = [Salome_Koechlin_portfolioItem0]; 
    let Salome_Koechlin_currentPortfolio = 0;

    document.body.addEventListener('click', (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
	let o = intersects[0].object; 
	while (o.parent && !o.userData.clickable) {
	  o = o.parent;
	}
	if (o.userData.clickable) {
	  if (o === Salome_Koechlin_leftIcon || o === Salome_Koechlin_rightIcon) {
	    if (o === Salome_Koechlin_leftIcon) {
	      Salome_Koechlin_currentPortfolio = (Salome_Koechlin_currentPortfolio - 1 + Salome_Koechlin_portfolioItems.length) % Salome_Koechlin_portfolioItems.length;
	    } else {
	      Salome_Koechlin_currentPortfolio = (Salome_Koechlin_currentPortfolio + 1) % Salome_Koechlin_portfolioItems.length;
	    }
	    Salome_Koechlin_portfolioItem0Video.pause();
	    for (let i = 0; i < Salome_Koechlin_portfolioItems.length; i++) {
	      Salome_Koechlin_portfolioGroup.remove(Salome_Koechlin_portfolioItems[i]);
	    }
	    Salome_Koechlin_portfolioGroup.add(Salome_Koechlin_portfolioItems[Salome_Koechlin_currentPortfolio]);
	  } else if (o === Salome_Koechlin_portfolioItem0) {
	    Salome_Koechlin_portfolioGroup.remove(Salome_Koechlin_portfolioItem0);
	    Salome_Koechlin_portfolioGroup.add(Salome_Koechlin_portfolioItem0V);
	    Salome_Koechlin_portfolioItems[0] = Salome_Koechlin_portfolioItem0V;
	    Salome_Koechlin_portfolioItem0Video.play();
	  } else if (o === Salome_Koechlin_portfolioItem0V) {
	    if (Salome_Koechlin_portfolioItem0Video.paused) {
	      Salome_Koechlin_portfolioItem0Video.play();
	    } else {
	      Salome_Koechlin_portfolioItem0Video.pause();
	    }
	  }
	}
      }
    });
	

    const clock = new THREE.Clock();
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const iconScale = 1 + 0.2 * Math.sin(elapsed*5);
      [].forEach((icon) => {
	icon.scale.set(iconScale, iconScale, iconScale);
      });

      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
		

  }
  start();
});
