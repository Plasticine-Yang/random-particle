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
  move() {
    this.y -= 0.15;
    if (this.y <= -10) {
      this.y = HEIGHT + 10;
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
const generateParticles = (particleCount: number) => {
  for (let i = 0; i < particleCount; i++) {
    // 粒子 x, y 坐标
    const x = Math.random() * WIDTH;
    const y = Math.random() * HEIGHT;

    // 粒子半径的大小在 1 ~ 3 个单位之间随机生成
    const radius = Math.random() * 2 + 1;

    // 随机透明度
    const alpha = Math.floor(Math.random() * 10) + 1 / 10 / 2;
    const color = `rgba(255, 255, 255, ${alpha})`;

    const particle = new Particle(i, x, y, radius, color);

    particles.push(particle);
    particle.draw();
  }
};

/**
 * @description 开启粒子动画
 */
const showParticleAnimation = () => {
  // 清屏 用于刷新下一帧
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (const particle of particles) {
    particle.move();
  }

  requestAnimationFrame(showParticleAnimation);
};

/**
 * @description 粒子动画背景配置项
 */
interface ParticleOptions {
  /**
   * @description 粒子数量
   */
  particleCount?: number;
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

  // 初始化 canvas 信息
  setupCanvasEl(canvasEl);

  // 生成粒子
  generateParticles(particleCount);

  // 开启粒子动画
  showParticleAnimation();
};
