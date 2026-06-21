/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createExtension("pgcrypto", { ifNotExists: true });
  pgm.createType("user_role", ["USER", "ADMIN"]);
  pgm.createType("user_status", ["ACTIVE", "INACTIVE"]);
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      type: "varchar(50)",
      notNull: true,
      unique: true,
    },
    first_name: {
      type: "varchar(100)",
      notNull: true,
    },
    last_name: {
      type: "varchar(100)",
      notNull: false,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    email_verified: {
      type: "boolean",
      notNull: true,
      default: false,
    },
    password_hash: {
      type: "text",
      notNull: true,
    },
    role: {
      type: "user_role",
      notNull: true,
      default: "USER",
    },
    status: {
      type: "user_status",
      notNull: true,
      default: "ACTIVE",
    },
    last_login_at: {
      type: "timestamp with time zone",
      notNull: false,
    },
    created_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "timestamp with time zone",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("users");
    pgm.dropType("user_status");
    pgm.dropType("user_role");
};
