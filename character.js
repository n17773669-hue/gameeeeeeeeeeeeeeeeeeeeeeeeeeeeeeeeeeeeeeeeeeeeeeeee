let leftArm, rightArm, leftLeg, rightLeg;

function createCharacter(scene, isOwner) {
    const playerGroup = new THREE.Group();

    // Chất liệu quần áo nhân vật
    const bodyMat = new THREE.MeshStandardMaterial({ color: isOwner ? 0xff0055 : 0x00ffcc, roughness: 0.3 });
    const limbMat = new THREE.MeshStandardMaterial({ color: 0x1f2430 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

    // 1. Thân người (Torso)
    const bodyGeo = new THREE.BoxGeometry(1.6, 2.4, 0.8);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 2.2;
    playerGroup.add(body);

    // 2. Đầu nhân vật / Headless Owner
    if(!isOwner) {
        const headGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
        const head = new THREE.Mesh(headGeo, skinMat);
        head.position.y = 3.7;
        playerGroup.add(head);
    } else {
        const headlessGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const headlessMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const headless = new THREE.Mesh(headlessGeo, headlessMat);
        headless.position.y = 3.8;
        playerGroup.add(headless);
    }

    // 3. Tay trái & Tay phải (Có tay chân đàng hoàng)
    const armGeo = new THREE.BoxGeometry(0.5, 2, 0.5);
    
    leftArm = new THREE.Mesh(armGeo, limbMat);
    leftArm.position.set(-1.1, 2.2, 0);
    playerGroup.add(leftArm);

    rightArm = new THREE.Mesh(armGeo, limbMat);
    rightArm.position.set(1.1, 2.2, 0);
    playerGroup.add(rightArm);

    // 4. Chân trái & Chân phải
    const legGeo = new THREE.BoxGeometry(0.6, 2.2, 0.6);

    leftLeg = new THREE.Mesh(legGeo, limbMat);
    leftLeg.position.set(-0.45, 0.9, 0);
    playerGroup.add(leftLeg);

    rightLeg = new THREE.Mesh(legGeo, limbMat);
    rightLeg.position.set(0.45, 0.9, 0);
    playerGroup.add(rightLeg);

    scene.add(playerGroup);
    playerGroup.position.y = 0;
    return playerGroup;
}

// Hoạt ảnh bước đi tay chân khi di chuyển
function animateCharacterWalk(player, time) {
    if (leftArm && rightArm && leftLeg && rightLeg) {
        let swing = Math.sin(time * 0.015) * 0.6;
        leftArm.rotation.x = swing;
        rightArm.rotation.x = -swing;
        leftLeg.rotation.x = -swing;
        rightLeg.rotation.x = swing;
    }
}
