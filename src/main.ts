import useParticles from './hooks/useParticles';
import './style.css';

const oParticleCanvas =
  document.querySelector<HTMLCanvasElement>('#particles')!;

useParticles(oParticleCanvas, {
  particleCount: 100,
  particleColors: ['#EFFFFD', '#B8FFF9', '#85F4FF', '#42C2FF'],
  particleMaxSize: 30,
});
