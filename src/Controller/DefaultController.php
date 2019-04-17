<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use App\Repository\EventRepository;
use App\Form\NewsletterType;


class DefaultController extends CustomController
{
  /**
  * @Route("/{_locale}/", name="homepage", requirements={"_locale"="%app.locales%"})
  * @Route("/{_locale}/home", name="homepage_localized", requirements={"_locale"="%app.locales%"})
  * @Route("/{_locale}/home/{period}/", name="homepage_period", requirements={"_locale"="%app.locales%", "period"="presale|sale"})
  */
  public function indexAction(Request $request, EventRepository $er, $period = null)
  {


    $locale = $request->get('_locale');
    if($locale==null){
      $locale = $this->detectLocale($request);
    }

    $request->setLocale($locale);
    if (in_array($_SERVER['HTTP_HOST'], array(
      'backend.gocoworker.com',
    ))) {
      return $this->backendAction($request);
    }
    $limit = 4;
    $events = $er->getFollowing();
    if(count($events)<$limit)
    {

      if($previsouEvent = $er->getPrevious($limit - count($events)))
      {
        //previous event will be at first indexes of array
        foreach ($events as $e) {
            $previsouEvent[] = $e;
        }
        $events = $previsouEvent;

      }

    }

    $newsletterForm = $this->createForm(NewsletterType::class,null, ['email'=>($this->getUser() ? $this->getUser()->getEmail():'')]);
  //  $published = ($this->getUser() && $this->getUser()->hasRole('ROLE_ADMIN') ? null : true);
    return $this->renderTemplate('frontend/default/homepage.html.twig', [
        'events' => $events,
        'period' => $period,
        'newsletterFormTop' => $newsletterForm->createView(),
        'newsletterForm' => $newsletterForm->createView(),
    ]);
  }

  /**
  * @Route("/{_locale}/newsletter/subscription", name="newsletter_on", requirements={"_locale"="%app.locales%"})
  */
  public function subscribeNewsletter(Request $request){

    $form = $this->createForm(NewsletterType::class,null, ['email'=>($this->getUser()?$this->getUser()->getEmail():'')]);
    $form->handleRequest($request);

    if ($form->isSubmitted() && $form->isValid()) {
      $data = $form->getData();
      $user = $this->getUser();
      if($user && mb_strtolower($user->getEmail())==mb_strtolower($data['email']))
      {
        $result = $this->subsribeNewsletterUser($data['email'], $user->getFirstname());
        $user->setNewsletterUser(true);
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
      }
      else{
        $result = $this->subsribeNewsletterUser($data['email']);
      }
      $this->message('newsletter_subscription_successfull');
      //return $this->json($result);
    }



    return $this->redirectToRoute('homepage_localized');

  }

/**

* @Route("/{_locale}/a-propos", name="about_localized", requirements={"_locale"="%app.locales%"})
*/
public function aboutAction(Request $request)
{

  return $this->render('frontend/default/about.html.twig', []);
}

/**
* @Route("/contact", name="contact")
* @Route("/{_locale}/contact", name="contact_localized", requirements={"_locale"="%app.locales%"})
*/
public function contactAction(Request $request)
{

  return $this->render('frontend/default/contact.html.twig', []);
}


/**
* @Route("/{_locale}/mentions-legales", name="legal_notice")
*/
public function legalNoticeAction(Request $request)
{

  return $this->render('frontend/default/legals.html.twig', []);
}


/**
* @Route("/{_locale}/faq", name="faq")
*/
public function faqAction(Request $request)
{

  return $this->render('frontend/default/faq.html.twig', []);
}


/**
* @IsGranted("ROLE_ADMIN")
* @Route("/{_locale}/backend", name="backend_localized", requirements={"_locale"="%app.locales%"})
*/
public function backendAction(Request $request)
{
  return $this->render('backend/index.html.twig', []);
}



/**
* @Route("/", name="switchToLocale")
*/
public function changeLocaleAction(Request $request, $path_localized = 'homepage_localized', $params = array()){

  $locale = $this->detectLocale($request);
  $request->setLocale($locale);
  //return $this->text('debug');
  $params['_locale'] = $locale;
  return $this->redirectToRoute($path_localized, $params);
}



}
