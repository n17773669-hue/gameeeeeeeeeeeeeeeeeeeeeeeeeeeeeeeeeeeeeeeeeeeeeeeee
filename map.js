function createMap(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    sunLight.position.set(30, 50, 30);
    scene.add(sunLight);

    const fireLight = new THREE.PointLight(0xff7700, 2, 80);
    fireLight.position.set(0, 15, 0);
    scene.add(fireLight);

    // Mặt đất & Lưới không gian
    const floorGeo = new THREE.PlaneGeometry(300, 300);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x1c2030, roughness: 0.9 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(300, 40, 0x00ffcc, 0x2c324a);
    gridHelper.position.y = 0.1;
    scene.add(gridHelper);

    // Cột trụ chiến trường xung quanh
    const obstacleMat = new THREE.MeshStandardMaterial({ color: 0x2b3045, roughness: 0.7 });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x00ffcc, emissiveIntensity: 0.5 });

    for(let x = -70; x <= 70; x += 35) {
        for(let z = -70; z <= 70; z += 35) {
            if(Math.abs(x) > 20 || Math.abs(z) > 20) {
                let height = 15 + Math.random() * 15;
                const pillarGeo = new THREE.BoxGeometry(6, height, 6);
                const pillar = new THREE.Mesh(pillarGeo, obstacleMat);
                pillar.position.set(x, height/2, z);
                scene.add(pillar);

                const topGeo = new THREE.BoxGeometry(6.4, 2, 6.4);
                const topMesh = new THREE.Mesh(topGeo, accentMat);
                topMesh.position.set(x, height + 1, z);
                scene.add(topMesh);
            }
        }
    }
}
