<?php

namespace App\Form;

use App\Entity\Event;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TimeType;
use Symfony\Component\Validator\Constraints\All;
use Symfony\Component\Validator\Constraints\Image;

class EventType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('date')
            ->add('place')
            ->add('price')
            ->add('imageFiles', FileType::class, array(
              'label' => 'Logo', 'required'=>false,
              'data_class' => null,
              'constraints' =>
              new Image(array(
              'maxSize'       => '10M',
              'allowSquare'   => true,
              'allowPortrait' => true,
              //'minRatio'      => 1.43,
              //'maxRatio'      => 2.4
            ))))
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Event::class,
        ]);
    }
}
