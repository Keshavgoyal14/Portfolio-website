import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const nodeCount = 72;
    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];
    for (let index = 0; index < nodeCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 11;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 2;
      velocities.push({ x: (Math.random() - 0.5) * 0.0018, y: (Math.random() - 0.5) * 0.0018 });
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(pointsGeometry, new THREE.PointsMaterial({ color: 0xd04b2f, size: 0.045, transparent: true, opacity: 0.8 }));
    scene.add(points);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xd04b2f, transparent: true, opacity: 0.11 });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const pointer = { x: 0, y: 0 };
    const resize = () => {
      const width = canvas.clientWidth || canvas.parentElement.clientWidth;
      const height = canvas.clientHeight || canvas.parentElement.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const movePointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.15;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.1;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement);
    window.addEventListener('pointermove', movePointer, { passive: true });
    resize();

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const currentPositions = pointsGeometry.attributes.position.array;
      const linePositions = [];
      for (let index = 0; index < nodeCount; index += 1) {
        const xIndex = index * 3;
        currentPositions[xIndex] += velocities[index].x;
        currentPositions[xIndex + 1] += velocities[index].y;
        if (Math.abs(currentPositions[xIndex]) > 5.6) velocities[index].x *= -1;
        if (Math.abs(currentPositions[xIndex + 1]) > 3.1) velocities[index].y *= -1;
        for (let other = index + 1; other < nodeCount; other += 1) {
          const otherIndex = other * 3;
          const dx = currentPositions[xIndex] - currentPositions[otherIndex];
          const dy = currentPositions[xIndex + 1] - currentPositions[otherIndex + 1];
          if (dx * dx + dy * dy < 1.15) linePositions.push(currentPositions[xIndex], currentPositions[xIndex + 1], currentPositions[xIndex + 2], currentPositions[otherIndex], currentPositions[otherIndex + 1], currentPositions[otherIndex + 2]);
        }
      }
      pointsGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lines.geometry.computeBoundingSphere();
      scene.rotation.y += (pointer.x - scene.rotation.y) * 0.01;
      scene.rotation.x += (pointer.y - scene.rotation.x) * 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', movePointer);
      pointsGeometry.dispose();
      points.material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas className="three-background" ref={canvasRef} aria-hidden="true" />;
}
