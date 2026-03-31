import { pool } from '../db.js';

export const onboarding = async (req, res) => {
  const { id: user_id, role } = req.user;
  const onboardingData = req.body;

  try {
    let query;
    let params;

    if (role === 'student') {
      const { education_level, current_sem, graduation_year, primary_skill, portfolio_link, college_id } = onboardingData;
      query = `
        INSERT INTO student_profiles (user_id, education_level, current_sem, graduation_year, primary_skill, portfolio_link, college_id, verify_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (user_id) DO UPDATE SET
          education_level = EXCLUDED.education_level,
          current_sem = EXCLUDED.current_sem,
          graduation_year = EXCLUDED.graduation_year,
          primary_skill = EXCLUDED.primary_skill,
          portfolio_link = EXCLUDED.portfolio_link,
          college_id = EXCLUDED.college_id,
          verify_by = EXCLUDED.verify_by
        RETURNING *;
      `;
      params = [user_id, education_level, current_sem, graduation_year, primary_skill, portfolio_link, college_id || null, college_id ? 'college' : 'admin'];
    } else if (role === 'industry') {
      const { company_name, business_sector, company_size, typical_hiring_roles } = onboardingData;
      query = `
        INSERT INTO industry_profiles (user_id, company_name, business_sector, company_size, typical_hiring_roles)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id) DO UPDATE SET
          company_name = EXCLUDED.company_name,
          business_sector = EXCLUDED.business_sector,
          company_size = EXCLUDED.company_size,
          typical_hiring_roles = EXCLUDED.typical_hiring_roles
        RETURNING *;
      `;
      params = [user_id, company_name, business_sector, company_size, typical_hiring_roles];
    } else if (role === 'college') {
      const { institution_name, university_affiliation, enrolled_students, primary_departments } = onboardingData;
      query = `
        INSERT INTO college_profiles (user_id, institution_name, university_affiliation, enrolled_students, primary_departments)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id) DO UPDATE SET
          institution_name = EXCLUDED.institution_name,
          university_affiliation = EXCLUDED.university_affiliation,
          enrolled_students = EXCLUDED.enrolled_students,
          primary_departments = EXCLUDED.primary_departments
        RETURNING *;
      `;
      params = [user_id, institution_name, university_affiliation, enrolled_students, primary_departments];
    } else {
      return res.status(400).json({ error: 'Invalid user role' });
    }

    const { rows } = await pool.query(query, params);
    res.status(200).json({ message: 'Profile saved successfully', profile: rows[0] });
  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProfile = async (req, res) => {
  const { id: user_id, role } = req.user;

  try {
    let profileQuery;
    if (role === 'student') profileQuery = 'SELECT * FROM student_profiles WHERE user_id = $1';
    else if (role === 'industry') profileQuery = 'SELECT * FROM industry_profiles WHERE user_id = $1';
    else if (role === 'college') profileQuery = 'SELECT * FROM college_profiles WHERE user_id = $1';
    else return res.status(400).json({ error: 'Invalid role' });

    const profileResult = await pool.query(profileQuery, [user_id]);
    const userResult = await pool.query('SELECT name, email, role, is_verified, created_at FROM users WHERE id = $1', [user_id]);

    res.json({
      user: userResult.rows[0],
      profile: profileResult.rows[0] || null
    });
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
