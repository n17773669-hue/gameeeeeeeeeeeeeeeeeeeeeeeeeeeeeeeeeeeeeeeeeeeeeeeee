function createMap(scene) {
    // Ánh sáng chiến trường màu vàng lửa hệt như ảnh mẫu
    const ambientLight = new THREE.AmbientLight(0x223344, 0.8);
    scene.add(ambientLight);

    const fireLight = new THREE.DirectionalLight(0xffaa33, 1.5);
    fireLight.position.set(40, 40, -20);
    scene.add(fireLight);

    const pointLight = new THREE.PointLight(0xff5500, 2, 60);
    pointLight.position.set(-10, 10, -10);
    scene.add(pointLight);

    // Mặt đất chiến trường có lưới ô vuông (Grid)
    const floorGeo = new THREE.PlaneGeometry(250, 250);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x11191f, roughness: 0.8 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const gridHelper = new THREE.GridHelper(250, 30, 0x00ffcc, 0x1d2d3a);
    gridHelper.position.y = 0.05;
    scene.add(gridHelper);

    // ================= BỘ XƯƠNG QUÁI VẬT KHỔNG LỒ (Lấy cảm hứng từ ảnh mẫu) =================
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xdcdcdc, roughness: 0.5 });
    const skeletonGroup = new THREE.Group();

    // Hộp sọ quái vật
    const skullGeo = new THREE.BoxGeometry(6, 4, 10);
    const skull = new THREE.Mesh(skullGeo, boneMat);
    skull.position.set(25, 2, -25);
    skull.rotation.y = -Math.PI / 4;
    skeletonGroup.add(skull);

    // Xương sống rồng uốn lượn
    for(let i = 0; i < 10; i++) {
        const spineGeo = new THREE.BoxGeometry(2.5, 2, 2.5);
        const spine = new THREE.Mesh(spineGeo, boneMat);
        spine.position.set(25 - i*3, 1.5 + Math.sin(i*0.5)*1, -25 + i*3.5);
        skeletonGroup.add(spine);
    }

    // Xương sườn lớn hai bên
    for(let i = 0; i < 5; i++) {
        const ribGeo = new THREE.BoxGeometry(1.2, 0.8, 8);
        const rib1 = new THREE.Mesh(ribGeo, boneMat);
        rib1.position.set(20 - i*2.5, 2, -15 + i*3);
        rib1.rotation.y = 0.5;
        skeletonGroup.add(rib1);
    }
    scene.add(skeletonGroup);

    // ================= THÙNG RÁC & ĐỐNG VẬT PHẨM ĐỔ NÁT =================
    const trashMat = new THREE.MeshStandardMaterial({ color: 0x3d444d, metalness: 0.4 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21 });

    // Tạo các thùng rác kim loại chiến trường
    const trashCoords = [
        {x: -15, z: -10}, {x: -18, z: -8}, {x: 12, z: 15}, {x: -10, z: 20}
    ];
    trashCoords.forEach(pos => {
        const binGeo = new THREE.CylinderGeometry(1.5, 1.2, 3.5, 8);
        const bin = new THREE.Mesh(binGeo, trashMat);
        bin.position.set(pos.x, 1.75, pos.z);
        scene.add(bin);
    });

    // Các hòm gỗ / vật phẩm đổ nát xung quanh
    const debrisCoords = [
        {x: -12, z: -12, rot: 0.2}, {x: -14, z: -14, rot: -0.5}, {x: 15, z: 12, rot: 1.2}
    ];
    debrisCoords.forEach(d => {
        const boxGeo = new THREE.BoxGeometry(2.5, 2, 2.5);
        const debris = new THREE.Mesh(boxGeo, woodMat);
        debris.position.set(d.x, 1, d.z);
        debris.rotation.y = d.rot;
        scene.add(debris);
    });
}
