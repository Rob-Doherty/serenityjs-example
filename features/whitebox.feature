Feature: WhiteBox IT Solutions Homepage

  As a potential WhiteBox IT Solutions customer
  I want to open the WhiteBox IT Solutions Homepage
  So that I can learn more about the software consultancy provided


  Scenario: Customer opens WhiteBox IT Solutions homepage

    When Jane opens the WhiteBox IT Solutions homepage
    Then Jane sees the WhiteBox IT Solutions homepage

  Scenario: Customer selects the github link

    Given Sean opens the WhiteBox IT Solutions homepage
    When Sean clicks the GitHub link
    Then Sean sees the GitHub page
