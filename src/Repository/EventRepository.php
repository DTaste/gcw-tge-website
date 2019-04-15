<?php

namespace App\Repository;

use App\Entity\Event;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
* @method Event|null find($id, $lockMode = null, $lockVersion = null)
* @method Event|null findOneBy(array $criteria, array $orderBy = null)
* @method Event[]    findAll()
* @method Event[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
*/
class EventRepository extends ServiceEntityRepository
{
  public function __construct(RegistryInterface $registry)
  {
    parent::__construct($registry, Event::class);
  }
  public function getAll()
  {

    return $this->createQueryBuilder('e')
    ->select('e,i')

    ->leftJoin('e.images', 'i')

    ->orderBy('e.date', 'ASC')
    ->addOrderBy('i.id', 'DESC')
    /*->setMaxResults($limit)*/
    ->getQuery()
    ->getResult()
    ;
  }


  public function getFollowing($limit = 100)
  {

    return  $this->createQueryBuilder('e')
    ->select('e,i')
    ->leftJoin('e.images', 'i')
    ->where('e.date >= :date')
    ->setParameter('date', date('Y-m-d'))
    ->orderBy('e.date', 'ASC')
    ->addOrderBy('i.id', 'DESC')
    /*->setMaxResults($limit)*/
    ->getQuery()
    ->getResult();
  }

  public function getPrevious($limit = 100)
  {

    return $this->createQueryBuilder('e')
    ->select('e,i')
    ->leftJoin('e.images', 'i')
    ->where('e.date < :date')
    ->setParameter('date', date('Y-m-d'))
    ->orderBy('e.date', 'DESC')
    ->addOrderBy('i.id', 'DESC')
    /*->setMaxResults($limit)*/
    ->getQuery()
    ->getResult()
    ;
  }

  // /**
  //  * @return Event[] Returns an array of Event objects
  //  */
  /*
  public function findByExampleField($value)
  {
  return $this->createQueryBuilder('e')
  ->andWhere('e.exampleField = :val')
  ->setParameter('val', $value)
  ->orderBy('e.id', 'ASC')
  ->setMaxResults(10)
  ->getQuery()
  ->getResult()
  ;
}
*/

/*
public function findOneBySomeField($value): ?Event
{
return $this->createQueryBuilder('e')
->andWhere('e.exampleField = :val')
->setParameter('val', $value)
->getQuery()
->getOneOrNullResult()
;
}
*/
}
