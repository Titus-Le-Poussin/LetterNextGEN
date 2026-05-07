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
skills          JSONB,
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

CREATE TABLE portfolio_projects (
id          SERIAL PRIMARY KEY,
title       VARCHAR(255) NOT NULL,
short_desc  TEXT,
description TEXT,
tech_stack  JSONB DEFAULT '[]',
media_url   TEXT,
media_type  VARCHAR(10) DEFAULT 'image',
github_url  TEXT,
demo_url    TEXT,
order_index INTEGER DEFAULT 0,
visible     BOOLEAN DEFAULT TRUE,
created_at  TIMESTAMP DEFAULT NOW(),
updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio_experiences (
id          SERIAL PRIMARY KEY,
company     VARCHAR(255) NOT NULL,
role        VARCHAR(255) NOT NULL,
period      VARCHAR(100),
description TEXT,
tech_stack  JSONB DEFAULT '[]',
is_current  BOOLEAN DEFAULT FALSE,
order_index INTEGER DEFAULT 0,
created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE portfolio_about (
id          SERIAL PRIMARY KEY,
bio         TEXT,
title       VARCHAR(255),
phone       VARCHAR(50),
email       VARCHAR(255),
age         INTEGER,
languages   VARCHAR(255),
updated_at  TIMESTAMP DEFAULT NOW()
);