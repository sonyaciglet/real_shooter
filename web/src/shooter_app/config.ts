class Config {
  // Enemy Params
  public EnemyCount: number = 10;
  public EnemyRadius: number = 20;

  //Enemy Sprite Params
  readonly EnemySpriteHeight: number = 40;
  readonly EnemySpriteWidth: number = 200;

  // Screen Params
  readonly ScreenWidth: number = 900;
  readonly ScreenHeight: number = 600;
}

export const config = new Config();
