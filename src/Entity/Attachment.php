<?php
namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;


/**
* Attachment
*
* @ORM\Table(name="attachment")
* @ORM\Entity(repositoryClass="App\Repository\AttachmentRepository")
*/
class Attachment
{
  /**
  * @var int
  *
  * @ORM\Column(name="id", type="integer")
  * @ORM\Id
  * @ORM\GeneratedValue(strategy="AUTO")
  */
  private $id;

  /**
  * @var string
  *
  * @ORM\Column(name="name", type="string", length=255)
  */
  private $name;

  /**
  * @var string
  *
  * @ORM\Column(name="path", type="string", length=255)
  */
  private $path;

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
   * @ORM\Column(type="boolean")
   */
  private $main = false;

  /**
   * @ORM\Column(type="smallint")
   */
  private $position = 0;

  /**
   * @ORM\ManyToOne(targetEntity="App\Entity\Event", inversedBy="images")
   */
  private $event;




  /**
  * Get id
  *
  * @return int
  */
  public function getId()
  {
    return $this->id;
  }

  /**
  * Set name
  *
  * @param string $name
  *
  * @return Attachment
  */
  public function setName($name)
  {
    $this->name = $name;

    return $this;
  }

  /**
  * Get name
  *
  * @return string
  */
  public function getName()
  {
    return $this->name;
  }

  /**
  * Set path
  *
  * @param string $path
  *
  * @return Attachment
  */
  public function setPath($path)
  {
    $this->path = $path;

    return $this;
  }

  /**
  * Get path
  *
  * @return string
  */
  public function getPath()
  {
    return $this->path;
  }


  public function __toString(){
    return $this->getPath().$this->getName();
  }

  public function toJson(){
    $data = ['i'=>$this->getId(),'m'=>$this->getMain(), 'p'=>$this->getPosition(),'u'=>$this->getUrl()];
    return $data;
  }


  public function getUrl()
  {
    return $this->__toString();
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


  public function getMain(): ?bool
  {
      return $this->main;
  }

  public function setMain(bool $main): self
  {
      $this->main = $main;

      return $this;
  }

  public function getPosition(): ?int
  {
      return $this->position;
  }

  public function setPosition(int $position): self
  {
      $this->position = $position;

      return $this;
  }

  public function getEvent(): ?Event
  {
      return $this->event;
  }

  public function setEvent(?Event $event): self
  {
      $this->event = $event;

      return $this;
  }

}
