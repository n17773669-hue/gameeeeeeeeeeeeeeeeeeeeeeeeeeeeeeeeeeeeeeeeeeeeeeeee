function triggerBattleEffect(scene, player, skillName) {
    // Tạo vòng sóng năng lượng phát nổ khi dùng chiêu
    const ringGeo = new THREE.RingGeometry(0.5, 1.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({ 
        color: skillName === 'E' ? 0x9933ff : (skillName === 'R' ? 0xff0055 : 0x00ffcc), 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });
    
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(player.position);
    ring.position.y = 0.2;
    scene.add(ring);

    // Hiệu ứng phình to vòng sáng rồi biến mất
    let scale = 1;
    let anim = setInterval(() => {
        scale += 0.4;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity -= 0.1;
        if (ring.material.opacity <= 0) {
            clearInterval(anim);
            scene.remove(ring);
        }
    }, 30);
}
