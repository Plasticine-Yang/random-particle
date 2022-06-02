const HEIGHT = document.documentElement.clientHeight;
const WIDTH = document.documentElement.clientWidth;
const particles: Particle[] = [];
let ctx: CanvasRenderingContext2D;

class Particle {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;

  /**
   * @param id 粒子的 id，用于标识粒子
   * @param x 粒子的 x 坐标
   * @param y 粒子的 y 坐标
   * @param radius 粒子的半径大小
   */
  constructor(id: number, x: number, y: number, radius: number, color: string) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  /**
   * @description 绘制粒子
   * @param ctx canvas 2d 上下文对象
   */
  draw() {
    ctx.fillStyle = this.color; // 设置画笔颜色
    ctx.shadowBlur = this.radius * 2; // 设置模糊半径
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * @description 粒子移动 只在垂直方向上移动
   * @param boundaryHeight 垂直方向的边界 用于超出边界时移动到边界另一边
   */
  move(particleMoveRate: number) {
    this.y -= particleMoveRate;
    if (this.y <= -this.radius) {
      this.y = HEIGHT + this.radius;
    }

    this.draw();
  }
}

/**
 * @description 初始化 canvas 画布
 * @param canvasEl canvas 元素
 */
const setupCanvasEl = (canvasEl: HTMLCanvasElement) => {
  // 获取上下文对象
  ctx = canvasEl.getContext('2d')!;
  canvasEl.height = HEIGHT;
  canvasEl.width = WIDTH;
};

/**
 * @description 生成粒子
 * @param ctx canvas 2d 上下文对象
 * @param particleCount 要生成的粒子数量
 */
const generateParticles = (
  particleCount: number,
  paricleColors: string[],
  particleMaxSize: number
) => {
  for (let i = 0; i < particleCount; i++) {
    // 粒子 x, y 坐标
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;

    // 粒子半径的大小在 1 ~ particleMaxSize 个单位之间随机生成
    const radius = Math.random() * (particleMaxSize - 1) + 1;
    const color =
      paricleColors[Math.floor(Math.random() * paricleColors.length)];

    const particle = new Particle(i, x, y, radius, color);

    particles.push(particle);
    particle.draw();
  }
};

/**
 * @description 开启粒子动画
 */
const showParticleAnimation = (particleMoveRate: number) => {
  // 清屏 用于刷新下一帧
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (const particle of particles) {
    particle.move(particleMoveRate);
  }

  requestAnimationFrame(showParticleAnimation.bind(null, particleMoveRate));
};

/**
 * @description 粒子动画背景配置项
 */
interface ParticleOptions {
  /**
   * @description 粒子数量
   */
  particleCount?: number;
  /**
   * @description 粒子颜色
   */
  particleColors?: string[];
  /**
   * @description 粒子最大尺寸
   */
  particleMaxSize?: number;
  /**
   * @description 粒子移动速度
   */
  particleMoveRate?: number;
}

/**
 * @description 粒子动画背景
 * @param canvasEl canvas 元素 如果没有则会自动创建一个
 * @param options 个性化配置项
 */
export default (
  canvasEl: HTMLCanvasElement,
  options?: ParticleOptions
): void => {
  const particleCount = options?.particleCount ?? 100;
  const paricleColors = options?.particleColors ?? ['#fff'];
  const particleMaxSize = options?.particleMaxSize ?? 3;
  const particleMoveRate = options?.particleMoveRate ?? 0.15;

  // 初始化 canvas 信息
  setupCanvasEl(canvasEl);

  // 生成粒子
  generateParticles(particleCount, paricleColors, particleMaxSize);

  // 开启粒子动画
  showParticleAnimation(particleMoveRate);
};
