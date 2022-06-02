import useParticles from './hooks/useParticles';
import './style.css';

const oParticleCanvas =
  document.querySelector<HTMLCanvasElement>('#particles')!;

useParticles(oParticleCanvas, {
  particleCount: 666,
  prticleColors: ['#90AEFF', '#CEFC86', '#60EFB8'],
});
