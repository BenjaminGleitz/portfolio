<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Project;
use App\Repository\ProjectRepository;

#[Route('/project', name: 'project_')]
class ProjectController extends AbstractController
{
    #[Route('/', name: 'index')]
    public function index(ProjectRepository $projectRepository): Response
    {
        $projects = $projectRepository->findAll();

        return $this->render('project/index.html.twig', [
            'projects' => $projects
        ]);
    }

    #[Route('/{id}', name: 'show')]
    public function show(int $id, ProjectRepository $projectRepository)
    {
        $project = $projectRepository->find($id);

        return $this->render('project/show.html.twig', [
            'project' => $project
        ]);
    }
}
