import click
import pygame
import random
import numpy as np

ENEMY_RADIUS_FACTOR=10
def calculate_enemy_radius(screen_dimensions, enemy_radius_factor):
    height, width = screen_dimensions
    return width / (2 * enemy_radius_factor)


class Enemy:
    def __init__(self, coords, radius):
        self.coords = coords
        self.radius = radius
        self.dead = False

    def get_distance(self, point):
        # in the case where the number of enemies is huge (unrealistic) distance calculation should be done in bulk
        diff = (self.coords - point)
        return np.sqrt(diff.dot(diff))

    def is_hit(self, point):
        distance = self.get_distance(point)
        return distance <= self.radius

    def shoot(self, point):
        self.dead |= self.is_hit(point)

    def get_string_representation(self, point):
        if self.dead:
            return "DEAD"
        return str(self.coords)

    def get_sprite(self, point, font):
        string_repr = self.get_string_representation(point)
        distance = self.get_distance(point)
        # TODO this should be done based on screen size or absolute values
        distance_frac = distance / self.radius
        GREEN = np.array((0, 255, 0))
        RED = np.array((255, 0, 0))
        BLACK = np.array((0, 0, 0))
        color = BLACK
        if self.dead:
            color = BLACK
        else:
            if distance_frac <= 1:
                color = GREEN
            elif distance_frac <= 3:
                coef = distance_frac / 3
                color = GREEN * (1 - coef) + RED * coef
            color = color.tolist()

        sprite = font.render(string_repr, False, color)
        return sprite


def generate_enemy_coords(screen_dimensions, num_enemies):
    w, h = screen_dimensions
    x_coords = np.random.randint(0, w, num_enemies)
    y_coords = np.random.randint(0, h, num_enemies)
    coords = np.stack((x_coords, y_coords), axis=-1)
    return coords


def generate_enemies(screen_dimensions, num_enemies):
    radius = calculate_enemy_radius(screen_dimensions, ENEMY_RADIUS_FACTOR)
    coords = generate_enemy_coords(screen_dimensions, num_enemies).tolist()
    enemies = [Enemy(pos, radius) for pos in coords]
    return enemies


def is_quit(event):
    if event.type == pygame.QUIT:
        return True
    return False


@click.command("play-game")
@click.option("--num-enemies", default=10, type=int, help="number of enemies")
@click.option("--screen-height", default=320, type=int, help="screen height")
@click.option("--screen-width", default=480, type=int, help="screen width")
def play_game(num_enemies, screen_height, screen_width):
    enemies = generate_enemies((screen_width, screen_height), num_enemies)
    print(enemies)

    screen = pygame.display.set_mode((screen_width, screen_height))
    pygame.font.init()
    font = pygame.font.Font('freesansbold.ttf', 20)
    text_step = 30

    running = True
    mouse_pos = np.array([0, 0])
    while running:
        mouse_pos = np.array(pygame.mouse.get_pos())
        for event in pygame.event.get():
            if is_quit(event):
                running = False
                continue

            elif event.type == pygame.MOUSEBUTTONDOWN:
                for enemy in enemies:
                    enemy.shoot(mouse_pos)
                pass

        screen.fill((255,255,255))
        for idx, enemy in enumerate(enemies):
            x_pos = idx * text_step
            y_pos = 0
            if x_pos >= (screen_height - 30):
                col_number = x_pos // (screen_height - 30)
                y_pos = 200 * col_number
                x_pos = x_pos % (screen_height - 30) - 30
            enemy_sprite = enemy.get_sprite(mouse_pos, font)
            screen.blit(enemy_sprite, (y_pos, x_pos))
        mouse_pos_sprite = font.render(str(mouse_pos), True, (0,0,0))
        screen.blit(mouse_pos_sprite, (mouse_pos))
        pygame.display.update()


if __name__ == "__main__":
    play_game()
