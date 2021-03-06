<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;

class NewsletterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
      //$email = $options['email'];
        $builder
            ->add('email', EmailType::class, array('label'=>'stay_updated', 'attr'=> ['placeholder'=> 'newsletter_email'], 'label_attr'=>['class'=>'primary-color'] ))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            // Configure your form options here
            // 'id',
            // 'email' => User::class,
        ]);
    }
}
