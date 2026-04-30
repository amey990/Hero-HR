import os

routes = [
    'dashboard', 'employees', 'employees/team', 'employees/org-chart',
    'attendance', 'attendance/calendar', 'leave/apply', 'leave',
    'leave/calendar', 'holidays', 'leave/team', 'salary/payslips',
    'salary/loans', 'salary/reimbursements', 'salary/revision',
    'documents', 'analytics'
]

for route in routes:
    dir_path = os.path.join('src/app', route)
    os.makedirs(dir_path, exist_ok=True)
    
    title = route.replace('/', ' - ').replace('-', ' ').title()
    
    content = f"""export default function Page() {{
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 text-center bg-white rounded-2xl border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 capitalize mb-2">{title}</h1>
      <p className="text-gray-500">This is a placeholder page for navigation testing.</p>
    </div>
  );
}}
"""
    with open(os.path.join(dir_path, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(content)

print("Placeholder pages generated.")
