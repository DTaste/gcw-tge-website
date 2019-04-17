<?php

namespace App\Controller\Backend;

use App\Entity\Event;
use App\Entity\Attachment;
use App\Form\EventType;
use App\Repository\EventRepository;
use App\Controller\CustomController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use \Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;

/**
* @Route("/event")
*/
class EventController extends CustomController
{
  /**
  * @Route("/", name="event_index", methods={"GET"})
  */
  public function index(EventRepository $eventRepository): Response
  {
    return $this->render('backend/event/index.html.twig', [
      'events' => $eventRepository->getAll(),
    ]);
  }

  /**
  * @Route("/new", name="event_new", methods={"GET","POST"})
  */
  public function new(Request $request): Response
  {
    $event = new Event();
    $form = $this->createForm(EventType::class, $event);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
        $em = $this->getDoctrine()->getManager();

        $em->persist($event);
        $em->flush();

        $this->uploadFile($em, $event);
        $em->persist($event);
        $em->flush();

        return $this->redirectToRoute('event_index');
      }

      return $this->render('backend/event/new.html.twig', [
        'event' => $event,
        'form' => $form->createView(),
      ]);
    }

    /**
    * @Route("/{id}", name="event_show", methods={"GET"})
    */
    public function show(Event $event): Response
    {
      return $this->render('backend/event/show.html.twig', [
        'event' => $event,
      ]);
    }

    /**
    * @Route("/{id}/edit", name="event_edit", methods={"GET","POST"})
    */
    public function edit(Request $request, Event $event): Response
    {
      $form = $this->createForm(EventType::class, $event);
      $form->handleRequest($request);

      if ($form->isSubmitted() && $form->isValid()) {
        $em = $this->getDoctrine()->getManager();
        $this->uploadFile($em, $event);
        $em->flush();


        return $this->redirectToRoute('event_edit', [
          'id' => $event->getId(),
        ]);

      }

      return $this->render('backend/event/edit.html.twig', [
        'event' => $event,
        'form' => $form->createView(),
      ]);
    }

    /**
    * @Route("/{id}", name="event_delete", methods={"DELETE"})
    */
    public function delete(Request $request, Event $event): Response
    {
      if ($this->isCsrfTokenValid('delete'.$event->getId(), $request->request->get('_token'))) {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($event);
        $entityManager->flush();
      }

      return $this->redirectToRoute('event_index');
    }


    private function uploadFile(\Doctrine\ORM\EntityManager &$em, Event &$event){
      // $file stores the uploaded file
      if($file = $event->getImageFiles())
      {

          if ($file instanceof UploadedFile) {

            $fileName = $this->generateUniqueFileName('event-'.$event->getSlug()).'.'.$file->guessExtension();

            // Move the file to the directory where brochures are stored
            try {
              $file->move(
                $this->getParameter('app.event_directory'),
                $fileName
              );
            } catch (FileException $e) {
              // ... handle exception if something happens during file upload
            }
            $attachment = new Attachment();
            $attachment->setName($fileName);
            $attachment->setPath($this->getParameter('app.event_path'));
            $attachment->setEvent($event);
            $em->persist($attachment);

            $event->addImage($attachment);

        }
      }
    }


  }
