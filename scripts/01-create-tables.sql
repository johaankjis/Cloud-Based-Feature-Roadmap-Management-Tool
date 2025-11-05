-- Feature Roadmap Management Database Schema

-- Features table: Core feature tracking
CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'backlog' CHECK (status IN ('backlog', 'planned', 'in-progress', 'completed', 'archived')),
  
  -- RICE Scoring components
  reach INTEGER DEFAULT 0,
  impact INTEGER DEFAULT 0 CHECK (impact BETWEEN 0 AND 3),
  confidence INTEGER DEFAULT 0 CHECK (confidence BETWEEN 0 AND 100),
  effort DECIMAL(10, 2) DEFAULT 0,
  rice_score DECIMAL(10, 2) GENERATED ALWAYS AS (
    CASE 
      WHEN effort > 0 THEN (reach * impact * confidence / 100.0) / effort
      ELSE 0
    END
  ) STORED,
  
  -- Metadata
  priority INTEGER DEFAULT 0,
  category VARCHAR(100),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  target_quarter VARCHAR(10),
  owner VARCHAR(255),
  team VARCHAR(100)
);

-- OKRs table: Objectives and Key Results
CREATE TABLE IF NOT EXISTS okrs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(20) CHECK (type IN ('objective', 'key-result')),
  parent_id INTEGER REFERENCES okrs(id) ON DELETE CASCADE,
  target_value DECIMAL(10, 2),
  current_value DECIMAL(10, 2) DEFAULT 0,
  progress INTEGER GENERATED ALWAYS AS (
    CASE 
      WHEN target_value > 0 THEN LEAST(100, ROUND((current_value / target_value * 100)::numeric, 0))
      ELSE 0
    END
  ) STORED,
  quarter VARCHAR(10),
  year INTEGER,
  owner VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feature-OKR mapping table
CREATE TABLE IF NOT EXISTS feature_okr_mapping (
  id SERIAL PRIMARY KEY,
  feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
  okr_id INTEGER REFERENCES okrs(id) ON DELETE CASCADE,
  alignment_score INTEGER DEFAULT 0 CHECK (alignment_score BETWEEN 0 AND 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(feature_id, okr_id)
);

-- Sprints table: Agile sprint management
CREATE TABLE IF NOT EXISTS sprints (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  goal TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed')),
  velocity INTEGER DEFAULT 0,
  team VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sprint-Feature mapping
CREATE TABLE IF NOT EXISTS sprint_features (
  id SERIAL PRIMARY KEY,
  sprint_id INTEGER REFERENCES sprints(id) ON DELETE CASCADE,
  feature_id INTEGER REFERENCES features(id) ON DELETE CASCADE,
  story_points INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(sprint_id, feature_id)
);

-- Comments/Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id SERIAL PRIMARY KEY,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INTEGER NOT NULL,
  action VARCHAR(100) NOT NULL,
  user_name VARCHAR(255),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_features_status ON features(status);
CREATE INDEX IF NOT EXISTS idx_features_rice_score ON features(rice_score DESC);
CREATE INDEX IF NOT EXISTS idx_features_target_quarter ON features(target_quarter);
CREATE INDEX IF NOT EXISTS idx_okrs_type ON okrs(type);
CREATE INDEX IF NOT EXISTS idx_okrs_quarter_year ON okrs(quarter, year);
CREATE INDEX IF NOT EXISTS idx_sprints_status ON sprints(status);
CREATE INDEX IF NOT EXISTS idx_activity_log_entity ON activity_log(entity_type, entity_id);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers
CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_okrs_updated_at BEFORE UPDATE ON okrs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sprints_updated_at BEFORE UPDATE ON sprints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
