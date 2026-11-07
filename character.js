function createCharacter(scene, isOwner) {
    const playerGroup = new THREE.Group();

    // Thân nhân vật gọn gàng, có giáp vai phong cách chiến đấu
    const bodyGeo = new THREE.BoxGeometry(1.6, 3.2, 0.8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: isOwner ? 0xff0055 : 0x00ffcc, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.6;
    playerGroup.add(body);

    // Đầu nhân vật / Headless cho Owner
    if(!isOwner) {
        const headGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
        const headMat = new THREE.MeshStandardMaterial({ color: 0xffcc99 });
        const head = new THREE.Mesh(headGeo, headMat);
        head.position.y = 3.5;
        playerGroup.add(head);
    } else {
        const headlessGeo = new THREE.SphereGeometry(0.8, 16, 16);
        const headlessMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
        const headless = new THREE.Mesh(headlessGeo, headlessMat);
        headless.position.y = 3.6;
        playerGroup.add(headless);
    }

    scene.add(playerGroup);
    playerGroup.position.y = 0;
    return playerGroup;
}
