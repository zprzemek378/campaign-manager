import MainLayout from "../../layouts/MainLayout/MainLayout";
import styles from "./Information.module.scss";

type InformationProps = {
  gemQuantity: number;
};

const Information = ({ gemQuantity }: InformationProps) => {
  return (
    <MainLayout gemQuantity={gemQuantity}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Campaign Manager - Application Guide</h2>
        </div>

        <section className={styles.content}>
          <h3>About the Application</h3>
          <p>
            Campaign Manager is a comprehensive tool for managing marketing
            campaigns. The application allows you to create, monitor, and manage
            various marketing campaigns using a virtual currency.
          </p>

          <h3>Managing Campaigns</h3>
          <h4>Creating a Campaign</h4>
          <ol>
            <li>Click the "Add new campaign" button in the Campaign List</li>
            <li>
              Fill in the required details:
              <ul>
                <li>
                  <strong>Name:</strong> Your campaign's unique identifier
                </li>
                <li>
                  <strong>Keywords:</strong> Add at least one keyword related to
                  your campaign
                </li>
                <li>
                  <strong>Bid Amount:</strong> The amount you're willing to
                  spend per interaction (minimum 0.1)
                </li>
                <li>
                  <strong>Campaign Fund:</strong> Total budget for your campaign
                </li>
                <li>
                  <strong>Active Status:</strong> Toggle whether the campaign is
                  active or paused
                </li>
                <li>
                  <strong>Town:</strong> Select the target location
                </li>
                <li>
                  <strong>Radius:</strong> Set the campaign's reach radius in
                  kilometers
                </li>
              </ul>
            </li>
          </ol>

          <h4>Managing Existing Campaigns</h4>
          <ul>
            <li>
              <strong>View Details:</strong> Click the expand arrow on any
              campaign card to see full details
            </li>
            <li>
              <strong>Edit Campaign:</strong> Use the pencil icon to modify any
              campaign's settings
            </li>
            <li>
              <strong>Delete Campaign:</strong> Click the trash icon to remove a
              campaign (requires confirmation)
            </li>
            <li>
              <strong>Active/Inactive:</strong> Campaigns can be toggled between
              active and inactive states
            </li>
          </ul>

          <h3>Understanding Campaign Cards</h3>
          <ul>
            <li>
              <strong>Status Indicator:</strong> Shows if a campaign is active
              (colored) or inactive (greyscale)
            </li>
            <li>
              <strong>Keywords:</strong> Displayed as pills below the campaign
              name
            </li>
            <li>
              <strong>Financial Information:</strong> View bid amounts and
              campaign funds
            </li>
            <li>
              <strong>Location Details:</strong> Shows target town and radius
              coverage
            </li>
          </ul>

          <h3>Gem Currency System</h3>
          <p>
            Gems are the virtual currency used to fund campaigns. Your current
            gem balance is displayed at the top of the screen. When creating or
            modifying campaigns, ensure you have sufficient gems to cover the
            campaign fund.
          </p>

          <h3>Important Notes</h3>
          <ul>
            <li>
              Campaign funds can be increased or decreased, affecting your gem
              balance
            </li>
            <li>Each campaign requires at least one keyword</li>
            <li>Bid amounts must be at least 0.1</li>
            <li>Campaign funds must be greater than zero</li>
            <li>Radius must be a positive number</li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
};

export default Information;
