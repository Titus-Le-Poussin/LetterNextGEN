 CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT NOW()
);


 CREATE TABLE prompts (
id          SERIAL PRIMARY KEY,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
name        VARCHAR(255) NOT NULL,
content     TEXT NOT NULL,
is_default  BOOLEAN DEFAULT FALSE,
created_at  TIMESTAMP DEFAULT NOW(),
updated_at  TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE letter_templates (
id          SERIAL PRIMARY KEY,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
name        VARCHAR(255) NOT NULL,
content     TEXT NOT NULL,
is_default  BOOLEAN DEFAULT FALSE,
created_at  TIMESTAMP DEFAULT NOW(),
updated_at  TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE generated_letters (
id              SERIAL PRIMARY KEY,
user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
company_name    VARCHAR(255),
job_title       VARCHAR(255),
job_offer       TEXT,
letter_content  TEXT,
template_id     INTEGER REFERENCES letter_templates(id) ON DELETE SET NULL,
created_at      TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE resume_templates (
id          SERIAL PRIMARY KEY,
user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
name        VARCHAR(255) NOT NULL,
content     TEXT NOT NULL,
is_default  BOOLEAN DEFAULT FALSE,
created_at  TIMESTAMP DEFAULT NOW(),
updated_at  TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE generated_resume (
id              SERIAL PRIMARY KEY,
user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
company_name    VARCHAR(255),
job_title       VARCHAR(255),
job_offer       TEXT,
resume_content  TEXT,
template_id     INTEGER REFERENCES resume_templates(id) ON DELETE SET NULL,
created_at      TIMESTAMP DEFAULT NOW()
);

 CREATE TABLE skills (
id              SERIAL PRIMARY KEY,
user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
skill_name      VARCHAR(255),
category_name   VARCHAR(255),
created_at      TIMESTAMP DEFAULT NOW()
);