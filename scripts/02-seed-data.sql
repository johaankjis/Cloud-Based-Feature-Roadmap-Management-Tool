-- Seed data for Feature Roadmap Management Tool

-- Insert sample OKRs
INSERT INTO okrs (title, description, type, target_value, current_value, quarter, year, owner) VALUES
('Increase User Engagement', 'Drive 30% increase in daily active users', 'objective', 30, 12, 'Q1', 2025, 'Product Team'),
('Improve Platform Performance', 'Reduce API latency and improve scalability', 'objective', 40, 25, 'Q1', 2025, 'Engineering Team'),
('Expand Market Reach', 'Enter 3 new geographic markets', 'objective', 3, 1, 'Q2', 2025, 'Growth Team');

-- Insert Key Results for first objective
INSERT INTO okrs (title, description, type, parent_id, target_value, current_value, quarter, year, owner) VALUES
('Increase DAU by 30%', 'Daily Active Users growth', 'key-result', 1, 100000, 45000, 'Q1', 2025, 'Product Team'),
('Reduce churn rate to 5%', 'Customer retention improvement', 'key-result', 1, 5, 7, 'Q1', 2025, 'Product Team'),
('Achieve 4.5+ app rating', 'User satisfaction score', 'key-result', 1, 4.5, 4.2, 'Q1', 2025, 'Product Team');

-- Insert sample features
INSERT INTO features (title, description, status, reach, impact, confidence, effort, category, tags, target_quarter, owner, team) VALUES
('Real-time Collaboration', 'Enable multiple users to edit roadmaps simultaneously with live updates', 'in-progress', 5000, 3, 80, 8, 'Core Features', ARRAY['collaboration', 'real-time'], 'Q1 2025', 'Sarah Chen', 'Engineering'),
('Advanced RICE Calculator', 'Interactive RICE scoring with what-if analysis and historical trends', 'planned', 3000, 2, 90, 5, 'Analytics', ARRAY['prioritization', 'analytics'], 'Q1 2025', 'Mike Johnson', 'Product'),
('Mobile Dashboard', 'Native mobile app for roadmap viewing and quick updates', 'backlog', 8000, 2, 60, 13, 'Mobile', ARRAY['mobile', 'dashboard'], 'Q2 2025', 'Lisa Park', 'Mobile Team'),
('Jira Integration', 'Two-way sync with Jira for seamless workflow integration', 'planned', 4000, 3, 85, 8, 'Integrations', ARRAY['integration', 'jira'], 'Q1 2025', 'David Kumar', 'Engineering'),
('AI-Powered Prioritization', 'ML-based feature prioritization suggestions', 'backlog', 6000, 3, 50, 21, 'AI/ML', ARRAY['ai', 'automation'], 'Q3 2025', 'Emma Wilson', 'Data Science'),
('Custom Reporting', 'Build custom reports and export to PDF/Excel', 'in-progress', 2500, 2, 95, 5, 'Analytics', ARRAY['reporting', 'export'], 'Q1 2025', 'Tom Anderson', 'Product'),
('Stakeholder Portal', 'Read-only portal for executives and stakeholders', 'planned', 1000, 2, 80, 3, 'Access Control', ARRAY['portal', 'stakeholders'], 'Q2 2025', 'Rachel Green', 'Engineering'),
('Roadmap Templates', 'Pre-built templates for common roadmap patterns', 'completed', 7000, 1, 100, 2, 'Templates', ARRAY['templates', 'onboarding'], 'Q4 2024', 'Chris Lee', 'Product');

-- Map features to OKRs
INSERT INTO feature_okr_mapping (feature_id, okr_id, alignment_score) VALUES
(1, 1, 95),  -- Real-time Collaboration -> Increase User Engagement
(1, 4, 85),  -- Real-time Collaboration -> Increase DAU
(2, 1, 80),  -- Advanced RICE Calculator -> Increase User Engagement
(4, 2, 90),  -- Jira Integration -> Improve Platform Performance
(6, 1, 75),  -- Custom Reporting -> Increase User Engagement
(7, 1, 70),  -- Stakeholder Portal -> Increase User Engagement
(3, 3, 85);  -- Mobile Dashboard -> Expand Market Reach

-- Insert sample sprints
INSERT INTO sprints (name, goal, start_date, end_date, status, velocity, team) VALUES
('Sprint 23', 'Complete real-time collaboration MVP', '2025-01-06', '2025-01-19', 'active', 42, 'Engineering'),
('Sprint 24', 'Launch RICE calculator and custom reporting', '2025-01-20', '2025-02-02', 'planned', 38, 'Product'),
('Sprint 22', 'Foundation work for integrations', '2024-12-23', '2025-01-05', 'completed', 45, 'Engineering');

-- Map features to sprints
INSERT INTO sprint_features (sprint_id, feature_id, story_points) VALUES
(1, 1, 13),  -- Real-time Collaboration in Sprint 23
(1, 6, 8),   -- Custom Reporting in Sprint 23
(2, 2, 8),   -- Advanced RICE Calculator in Sprint 24
(2, 4, 13),  -- Jira Integration in Sprint 24
(3, 8, 5);   -- Roadmap Templates in Sprint 22 (completed)

-- Insert activity log entries
INSERT INTO activity_log (entity_type, entity_id, action, user_name, details) VALUES
('feature', 1, 'status_changed', 'Sarah Chen', '{"from": "planned", "to": "in-progress"}'::jsonb),
('feature', 1, 'rice_updated', 'Mike Johnson', '{"reach": 5000, "impact": 3, "confidence": 80, "effort": 8}'::jsonb),
('sprint', 1, 'created', 'Sarah Chen', '{"name": "Sprint 23", "team": "Engineering"}'::jsonb),
('okr', 1, 'progress_updated', 'Product Team', '{"current_value": 12, "target_value": 30}'::jsonb),
('feature', 8, 'completed', 'Chris Lee', '{"completion_date": "2024-12-20"}'::jsonb);
