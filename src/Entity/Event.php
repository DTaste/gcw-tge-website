<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Attachment;

/**
* @ORM\Entity(repositoryClass="App\Repository\EventRepository")
*/
class Event
{
  /**
  * @ORM\Id()
  * @ORM\GeneratedValue()
  * @ORM\Column(type="integer")
  */
  private $id;

  /**
  * @ORM\Column(type="string", length=120)
  */
  private $title;

  /**
  * @ORM\Column(type="datetime")
  */
  private $date;

  /**
  * @ORM\Column(type="string", length=32)
  */
  private $place;

  /**
  * @ORM\Column(type="string", length=10, nullable=true)
  */
  private $price;

  /*
  * @Assert\File(mimeTypes={ "image/jpeg", "image/jpg", "image/png" })
  */
  private $imageFiles;

  /**
  * @ORM\OneToMany(targetEntity="App\Entity\Attachment", mappedBy="event")
  */
  private $images;


  /**
  * @var \DateTime $created
  *
  * @Gedmo\Timestampable(on="create")
  * @ORM\Column(type="datetime")
  */
  private $created;

  /**
  * @var \DateTime $updated
  *
  * @Gedmo\Timestampable(on="update")
  * @ORM\Column(type="datetime")
  */
  private $updated;

  /**
  * @Gedmo\Slug(fields={"title","place","date"}, dateFormat="Ymd")
  * @ORM\Column(length=128, unique=true)
  */
  private $slug;



  public function __construct()
  {
    $this->images = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getTitle(): ?string
  {
    return $this->title;
  }

  public function setTitle(string $title): self
  {
    $this->title = $title;

    return $this;
  }

  public function getDate(): ?\DateTimeInterface
  {
    return $this->date;
  }

  public function setDate(\DateTimeInterface $date): self
  {
    $this->date = $date;

    return $this;
  }

  public function getPlace(): ?string
  {
    return $this->place;
  }

  public function setPlace(string $place): self
  {
    $this->place = $place;

    return $this;
  }

  public function getPrice(): ?string
  {
    return $this->price;
  }

  public function setPrice(?string $price): self
  {
    $this->price = $price;

    return $this;
  }

  public function getSlug(): ?string
  {
    return $this->slug;
  }

  public function setSlug(string $slug): self
  {
    $this->slug = $slug;

    return $this;
  }


  public function getCreated(): ?\DateTimeInterface
  {
    return $this->created;
  }

  public function setCreated(\DateTimeInterface $created): self
  {
    $this->created = $created;

    return $this;
  }

  public function getUpdated(): ?\DateTimeInterface
  {
    return $this->updated;
  }

  public function setUpdated(\DateTimeInterface $updated): self
  {
    $this->updated = $updated;

    return $this;
  }


  public function getImageFiles()
  {
    return $this->imageFiles;
  }



  public function addImageFiles($image): self
  {
    if ($image!=null && in_array($image, $this->imageFiles)===false) {
      $this->imageFiles[] = $image;
    }

    return $this;
  }

  public function removeImageFiles($image): self
  {
    if (in_array($image, $this->imageFiles)!==false) {
      $this->imageFiles->removeElement($image);
      /* TODO unlink file */
    }

    return $this;
  }


  public function setImageFiles($imageFiles): self
  {
    $this->imageFiles = $imageFiles;

    return $this;
  }

  /**
  * @return Collection|Attachment[]
  */
  public function getImages(): Collection
  {
    return $this->images;
  }

  /**
  * @return Attachment
  */
  public function getMainImage(): ?Attachment
  {
    
    if(count($this->images)>0){
      return $this->images[0];
    }
    return null;
  }

  public function addImage(Attachment $image): self
  {
    if (!$this->images->contains($image)) {
      $this->images[] = $image;
      $image->setEvent($this);
    }

    return $this;
  }

  public function removeImage(Attachment $image): self
  {
    if ($this->images->contains($image)) {
      $this->images->removeElement($image);
      // set the owning side to null (unless already changed)
      if ($image->getEvent() === $this) {
        $image->setEvent(null);
      }
    }

    return $this;
  }
}
