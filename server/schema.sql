CREATE TABLE IF NOT EXISTS islands (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug          VARCHAR(64)  NOT NULL UNIQUE,      -- 'one-versus-one'
    name          VARCHAR(128) NOT NULL,             -- 'One Versus One'
    description   TEXT         NOT NULL,
    url           VARCHAR(255) NOT NULL,
    sort_order    INT          NOT NULL,             -- island visit order, 1 = first
    map_x         DECIMAL(5,2) NOT NULL,             -- % position on the world map, 0-100
    map_y         DECIMAL(5,2) NOT NULL,
    active        TINYINT(1)   NOT NULL DEFAULT 1,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS discoverables (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    island_id     INT UNSIGNED NOT NULL,
    name          VARCHAR(64)  NOT NULL,             -- 'React', 'Docker'
    type          ENUM('technology','tool') NOT NULL,
    points        INT          NOT NULL,             -- 5 for technology, 1 for tool
    hint          VARCHAR(255) NULL,                 -- optional flavour text shown on discovery
    pos_x         DECIMAL(5,2) NULL,                 -- optional manual placement (% of island);
    pos_y         DECIMAL(5,2) NULL,                 -- NULL = auto-scatter client-side
    FOREIGN KEY (island_id) REFERENCES islands(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS scores (                   -- written in ticket 07, created now
    id                INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    player_name       VARCHAR(24) NOT NULL,
    score             INT         NOT NULL,
    islands_completed INT         NOT NULL,
    duration_seconds  INT         NOT NULL,
    created_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_score (score DESC)
);
