class linkedlist {
  //pointer to the head
  private Node head = new Node(0);
  //constructor of linked list
  public linkedlist() {

  }
  //insert item in the list
  public void insert(Object value) {
    Node temp = head;
    Node nNode = new Node(value);
    while (temp.getNext() != null) {
      temp = temp.getNext();
    }
    temp.setNext(nNode);
  }
  //remove an item given its value
  public boolean remove(Object value) {
    Node temp = head;
    while (temp.getNext() != null) {
      if (temp.getNext().getData() == value) {
        temp.setNext(temp.getNext().getNext());
        return true;
      }
      temp = temp.getNext();
    }
    return false;
  }

  public boolean find(Object value) {
    Node temp = head;
    while (temp.getNext() != null) {
      if (temp.getData() == value) {
        return true;
      }
      temp = temp.getNext();
    }
    return false;
  }
  //print out the list
  public String toString() {
    Node temp = head;
    String list = "";
    do {
      list += " " + temp.getData();
      temp = temp.getNext();
    } while (temp != null);
    return list;
  }
}
