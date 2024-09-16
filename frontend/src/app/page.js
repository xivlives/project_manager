import { useState, useEffect } from 'react';
import Link from 'next/link';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data));
    }, []);

    return (
        <div>
            <h1>My Projects</h1>
            <ul>
                {projects.map(project => (
                    <li key={project.id}>
                        <Link href={`/projects/${project.id}`}>
                            <a>{project.title} - {project.description}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
