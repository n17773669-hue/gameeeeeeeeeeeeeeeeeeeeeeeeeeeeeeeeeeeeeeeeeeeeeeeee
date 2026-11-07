function triggerBattleEffect(scene, player, skillName) {
    const ringGeo = new THREE.RingGeometry(0.5, 2, 32);
    const ringMat = new THREE.MeshBasicMaterial({ 
        color: skillName === 'E' ? 0x9933ff : (skillName === 'R' ? 0xff0055 : 0x00ffcc), 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });
    
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(player.position);
    ring.position.y = 0.1;
    scene.add(ring);

    let scale = 1;
    let anim = setInterval(() => {
        scale += 0.5;
        ring.scale.set(scale, scale, scale);
        ring.material.opacity -= 0.12;
        if (ring.material.opacity <= 0) {
            clearInterval(anim);
            scene.remove(ring);
        }
    }, 25);
}
