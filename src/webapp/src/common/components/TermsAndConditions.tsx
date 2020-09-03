import React from 'react';
import Helmet from 'react-helmet';
import {Container} from 'react-bootstrap';

const TermsAndConditions = () => {
  function renderTnCPage() {
    return (
      <div>
        <Helmet>
          <title>Terms and Conditions - Astro Payment Gateway</title>
          <meta
            property="og:title"
            content="Terms and Conditions - RK IPL Fantasy League"
          />
          <meta
            property="og:description"
            content="Read about our Terms & Conditions for RK IPL Fantasy League"
          />
        </Helmet>
        <Container className="t-and-c-container text-justify">
          <h4 className="text-center mb-4">
            RK IPL Fantasy League Terms and Conditions
          </h4>
          <h6 className="bg-light font-weight-bold mb-1 p-2">INTRODUCTION</h6>
          <p>
            The terms set out herein are intended to set out the terms for the
            use and access of the RK IPL Fantasy league made available to You by
            Rahul Kadam for friendly playing fantasy. BY ACCESSING AND/OR USING
            THE RK Fantasy League , YOU AGREE TO BE BOUND BY THESE TERMS AND
            CONDITIONS WITHOUT LIMITATION OR QUALIFICATION. IF YOU DO NOT AGREE
            TO THESE TERMS AND CONDITIONS, PLEASE DO NOT ACCESS AND/OR USE THE
            RK IPL Fantasy League.
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">DEFINITIONS</h6>
          <p>
            <strong>&quot;RK&quot;</strong> means Rahul Kadam a person who
            create this friendly website. ;
          </p>
          <p>
            <strong>&quot;IPL Fantasy League&quot;</strong> means friendly
            league which we create for playing users online with intention of
            IPL entertaintment only;
          </p>
          <p>
            &quot;RK IPL Fantasy Website Terms and Conditions&quot; means the
            rkfantasy.com Website Terms And Conditions found at{' '}
            <a
              href="https://www.rkfantasy.com/termsAndconditions"
              target="_blank"
              rel="noopener noreferrer">
              https://www.rkfantasy.com/termsAndconditions
            </a>
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">
            USING THE SITE AND CONTENT
          </h6>
          <p>
            The Site is only for your personal use. You may not use the Site for
            commercial purposes or in any way that is unlawful, or harms us or
            any other person or entity, as determined in our sole discretion.
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">SUBMISSIONS</h6>
          <p>
            In these terms of use, we use the word Submissions to mean text
            messages, ideas, concepts, pitches, suggestions, stories,
            screenplays, treatments, formats, artwork, photographs, drawings,
            videos, audiovisual works, musical compositions (including lyrics),
            sound recordings, program formats, characterisations, your and/or
            other persons names, likenesses, voices, usernames, profiles,
            actions, appearances, performances and/or other biographical
            information or material, and/or other similar materials that you
            submit, post, upload, embed, display, communicate or otherwise
            distribute (collectively Distribute) on or through any of the Sites.
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">
            LAW AND JURISDICTION
          </h6>
          <p>
            These terms of use shall be governed by and construed in accordance
            with the laws of India, and the courts of Khamgaon, Maharashtra,
            India shall have exclusive jurisdiction in respect of any actions or
            claims under these terms of use and you hereby consent and submit to
            the personal jurisdiction of such courts; provided that nothing
            herein shall prevent the application and enforcement of mandatory
            and applicable law. We use some on representive image on tournament,
            representation that information, content and materials on the Sites
            (including Submissions) are appropriate or available for use in any
            particular location. If anyone having any objection, please write to
            use over email, <strong>Iplfantasyleague20@gmail.com</strong> we
            will remove content, If you choose to access the Sites you do so on
            your own initiative and are responsible for compliance with all
            applicable laws including any applicable local laws.
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">
            AMENDMENT TO THESE TERMS OF USE
          </h6>
          <p>
            We reserve the right, in our sole discretion, to change, modify, add
            or delete portions of these terms of use at any time without notice,
            and it is your responsibility to review these terms of use for any
            changes. Your use of the Site following any amendment of these terms
            of use will signify and constitute your consent to and acceptance of
            such revised terms of use.
          </p>
          <h6 className="bg-light font-weight-bold mb-1 p-2">TERMINATION</h6>
          <p>
            These terms of use are effective until terminated by either you or
            us. You may terminate these terms of use at any time by
            discontinuing use of the Sites and destroying all materials obtained
            from the Sites and all related documentation and all copies and
            installations thereof, whether made under these terms of use or
            otherwise.
          </p>
        </Container>
      </div>
    );
  }

  return <div>{renderTnCPage()}</div>;
};

export default TermsAndConditions;
