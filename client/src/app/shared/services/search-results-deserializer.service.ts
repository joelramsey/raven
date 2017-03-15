import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchResult } from '../models/index';

@Injectable()
export class SearchResultsDeserializerService {

  constructor() {
  }

  public deserialize(response: Response): Observable<SearchResult> {

    // TODO: Unstub this once the backend is supporting search.
    //
    let rawData: any = this._mockData();
    // let rawData: any = response.json();

    let facetMap: any = {
      subject: [],
      type: []
    };

    return Observable.of({
      results: rawData.map(datum => {

        // Generate facets
        //
        datum['metadata']['dc:subject'].forEach((subject: string) => {
          if (facetMap.subject.indexOf(subject) === -1) {
            facetMap.subject.push(subject);
          }
        });

        // Types can be an array...
        //
        if (datum['metadata']['dc:type'] instanceof Array) {
          datum['metadata']['dc:type'].forEach((type: string) => {
            if (facetMap.type.indexOf(type) === -1) {
              facetMap.type.push(type);
            }
          });
        } else {
          if (facetMap.type.indexOf(datum['metadata']['dc:type']) === -1) {
            facetMap.type.push(datum['metadata']['dc:type']);
          }
        }

        // Map data
        //
        return {
          title: datum['metadata']['dc:title'],
          description: datum['metadata']['dc:description'],
          sourceUrl: 'http://files.eric.ed.gov/fulltext/' + datum['metadata']['dc:identifier']['content'] + '.pdf',
          citation: datum['metadata']['eric:citation'],
          facets: [
            {
              type: 'nominal',
              label: 'subject',
              values: datum['metadata']['dc:subject']
            },
            {
              type: 'nominal',
              label: 'type',
              values: (datum['metadata']['dc:type'] instanceof Array) ?
                datum['metadata']['dc:type'] :
                [datum['metadata']['dc:type']]
            }
          ]
        }
      }),
      facets: Object.keys(facetMap).reduce((res, key) => {
        res.push({
          label: key,
          values: facetMap[key],
          type: 'nominal'
        });

        return res;
      }, [])
    });
  }

  private _mockData() {
    return [{
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "No",
        "dc:subject": ["Abstracts", "Catalogs", "Education", "Educational Resources", "Indexes", "Resource Materials"],
        "dc:type": ["Reference Materials - Bibliographies", "Collected Works - Serials"],
        "eric:keywords": "Resources in Education",
        "eric:issn": "ISSN-0098-0897",
        "dc:creator": [{
          "scheme": "institution",
          "content": "ERIC Processing and Reference Facility, Laurel, MD."
        }, {
          "scheme": "institution",
          "content": "Computer Sciences Corp., Laurel, MD."
        }, {
          "scheme": "institution",
          "content": "Educational Resources Information Center (ED), Washington, DC."
        }],
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "Resources in Education (RIE) is a monthly abstract journal that announces (catalogs, indexes, abstracts) documents of interest to the educational community (including researchers, teachers, students, school board members, school administrators, counselors, parents, etc.). Each issue announces approximately 1,100 documents and provides indexes by Subject, Personal Author, Institution, Publication Type, and ERIC Clearinghouse Number. This special Computer Output Microfiche (COM) edition is prepared directly from the ERIC database prior to publication of the printed journal and therefore is lacking the cover and other regular introductory and advertising matter contained in the printed journal. The COM edition contains all five of the indexes in the printed edition. The first  accession in each issue of RIE is the issue itself. In this way, the monthly microfiche collection for each issue is immediately preceded by a microfiche index to that collection. This practice began with the RIE issue for May 1979. (CRW/WTB)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410371"
        },
        "dc:title": "Resources in Education (RIE). Volume 33, Number 1.",
        "dc:source": "Resources in Education",
        "eric:citation": "v33 n1 Jan 1998",
        "dc:date": "1998-01-00",
        "eric:sponsor": "Office of Educational Research and Improvement (ED), Washington, DC.",
        "eric:isbn": null,
        "dcterms:audience": null,
        "eric:pageCount": null,
        "dc:publisher": "Superintendent of Documents, U.S. Government Printing Office, Washington, DC 20402. On annual subscription, $77 (Domestic), $96.25 (Foreign).",
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": null,
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    }, {
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "Yes",
        "dc:subject": ["Adult Education", "Education Work Relationship", "Educational Finance", "Educational Objectives", "Educational Opportunities", "Educational Quality", "Educational Strategies", "Employment Qualifications", "Federal Legislation", "Foreign Countries", "Government Role", "Higher Education", "International Educational Exchange", "Labor Force Development", "Lifelong Learning", "Motivation Techniques", "National Programs", "Partnerships in Education", "Postsecondary Education", "Program Development", "School Business Relationship", "Skill Development", "Systems Approach", "Training Methods", "Unemployment", "Vocational Education", "Youth Employment", "Youth Programs"],
        "dc:type": "Guides - Non-Classroom",
        "eric:keywords": ["European Community", "Scottish Vocational Qualifications", "Great Britain", "Quality Assurance", "National Vocational Qualifications (England)", "General National Vocational Qualif (England)"],
        "eric:keywords_geo": "United Kingdom (Great Britain)",
        "eric:issn": null,
        "dc:creator": {
          "scheme": "institution",
          "content": "Department for Education and Employment, London (England)."
        },
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "This booklet describes British efforts to develop a world-class, highly skilled work force. The booklet examines the following topics: Britain's training framework (the National and Scottish Vocational Qualification system and national targets for foundation and lifetime learning and training); strategies for developing a flexible qualification system (the National Vocational Qualifications (NVQ) framework, NVQ levels, and sample NVQ routes); efforts to encourage employers to invest in training (the role of industry training organizations, training and enterprise councils, the Investors in People program, and the National Training Awards program); strategies for educating and training young people for high-quality skills (post-16 routes, education initiatives at the postsecondary  level and in higher education, further education-sector colleges, apprenticeships, youth training, the Youth Credits program, and careers services); motivating and enabling individuals to train (advice and guidance, incentives to train, and open and distance learning); initiatives to help unemployed people and individuals who are at a disadvantage in the labor market; methods to achieve and monitor quality in the training market; and mechanisms for working in partnership with the European Community (the European Social Fund and European Community training programs). Appended are lists of pertinent acts of Parliament and command papers and abbreviations. (MN)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410372"
        },
        "dc:title": "Training in Britain: A Guide.",
        "dc:source": null,
        "eric:citation": null,
        "dc:date": "1994-00-00",
        "eric:sponsor": null,
        "eric:isbn": null,
        "dcterms:audience": null,
        "eric:pageCount": 34,
        "dc:publisher": null,
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": null,
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    }, {
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "Yes",
        "dc:subject": ["Adolescents", "Allied Health Occupations Education", "Community Development", "Economic Development", "Employment Opportunities", "Empowerment", "Females", "Foreign Countries", "Individual Development", "Job Training", "Vocational Education", "Womens Education", "Young Adults"],
        "dc:creator": [{
          "scheme": "personal author",
          "content": "Assaad, Marie"
        }, {
          "scheme": "personal author",
          "content": "Bruce, Judith"
        }, {
          "scheme": "institution",
          "content": "Population Council, New York, NY."
        }],
        "dc:type": ["Collected Works - Serials", "Reports - Research"],
        "eric:keywords": ["Microenterprises", "Egypt"],
        "eric:keywords_geo": "Egypt",
        "eric:issn": "ISSN-0736-6833",
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "Until recently in Egyptian society, girls--from the point when their schooling ends to marriage--existed in a social void. In Maqattam, the situation is changing as a unique intervention has begun to define alternative expectations and opportunities for adolescent girls, providing them with a bridge between childhood and marriage and childbearing. Maqattam is a settlement of 17,000 people whose livelihoods are directly or indirectly linked to garbage collection and sorting. Girls and women make all the usual traditional female contributions to family life and are also in charge of most of the family's postgarbage collection tasks. Begun in 1987, the first livelihood project established for girls, rug-weaving, has two related objectives: adding to girls' economic skills and  personal income and finding a way to release them from the confines of their households. It seeks to impart a physical sense of self-esteem. A paper recycling project and an embroidery project were also established in 1993. The paper recycling done exclusively by young women may be the only project of this kind worldwide. A community health program that trains girls as health visitors provides them with health care in addition to training. A crisis management committee is negotiating two crises: first, girls' right to work and gain respect for their time, and, second, continuing autonomy as they marry. The experience suggests that microenterprise should be considered more seriously, along with other interventions, as an entry point for changing the social terms of reference for adolescent  girls. (YLB)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410373"
        },
        "dc:title": "Empowering the Next Generation: Girls of the Maqattam Garbage Settlement. SEEDS No. 19.",
        "dc:source": "SEEDS",
        "eric:citation": "n19 1997",
        "dc:date": "1997-00-00",
        "eric:sponsor": "Ford Foundation, New York, NY.",
        "eric:isbn": null,
        "dcterms:audience": null,
        "eric:pageCount": 30,
        "dc:publisher": "SEEDS, P.O. Box 3923, Grand Central Station, New York, NY 10163.",
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": null,
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    }, {
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "Yes",
        "dc:subject": ["Assembly (Manufacturing)", "Associate Degrees", "Competence", "Competency Based Education", "Computer Assisted Design", "Computer Assisted Manufacturing", "Drafting", "Engineering", "Engineering Graphics", "Equipment Manufacturers", "High Schools", "Job Skills", "Lifelong Learning", "Machinists", "Mechanical Design Technicians", "Numerical Control", "Occupational Information", "On the Job Training", "Postsecondary Education", "Tech Prep", "Technological Advancement", "Technology Education"],
        "dc:type": "Guides - Classroom - Teacher",
        "eric:keywords": "Computer Integrated Manufacturing",
        "eric:issn": null,
        "dc:creator": {
          "scheme": "institution",
          "content": "Lakeland Tech Prep Consortium, Kirtland, OH."
        },
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "This tech prep competency profile for computer-integrated manufacturing technology begins with definitions for four occupations: manufacturing technician, quality technician, mechanical engineering technician, and computer-assisted design/drafting (CADD) technician. A chart lists competencies by unit and indicates whether entire or partial unit is required for each occupation. A second chart lists units under subunits and competencies and indicates for five levels (end of grade 10, grade 12, or Associate Degree program; on-the-job training; or lifelong learning) whether the competency is to be introduced, or reinforced, or whether the student should be competent for entry-level positions. The 39 units are as follows: communications; mathematics; science literacy; technology;  employability skills; professionalism; teamwork; quality assurance; technical recording and reporting; computer literacy; workplace safety; manual drafting technology; advanced drafting technology; fundamental, intermediate, and advanced CADD; precision machining; manufacturing technology; computerized numerical control; basic materials science; welding basics; press technology; sheet metal fabrication; electrical test and measurement equipment; geometric dimensioning and tolerancing; hydraulics and pneumatics; basic electronics; electromechanical technology; programmable logic controllers; mechanical power transmission; production methods and costs; engineering mechanics; advanced engineering mechanics; computer programming; computer-based descriptive geometry; product design; design of  machines and machine elements; quality; and production planning and control. (YLB)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410374"
        },
        "dc:title": "Computer-Integrated Manufacturing Technology. Tech Prep Competency Profile.",
        "dc:source": null,
        "eric:citation": null,
        "dc:date": "1997-05-00",
        "eric:sponsor": null,
        "eric:isbn": null,
        "dcterms:audience": ["Practitioners", "Teachers"],
        "eric:pageCount": 153,
        "dc:publisher": null,
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": null,
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    }, {
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "Yes",
        "dc:subject": ["Adult Education", "Adult Learning", "Adult Literacy", "Agency Role", "College Role", "Cooperative Planning", "Educational Cooperation", "Educational Needs", "Educational Objectives", "Educational Planning", "Educational Policy", "Educational Strategies", "Educational Technology", "Educational Trends", "Financial Support", "Foreign Countries", "Global Education", "Government Role", "Government School Relationship", "Higher Education", "Lifelong Learning", "Literacy Education", "Nongovernmental Organizations", "Public Policy", "Social Change", "Vocational Education", "Womens Education"],
        "dc:type": "Reports - Research",
        "eric:keywords": "UNESCO",
        "eric:issn": null,
        "dc:creator": [{
          "scheme": "institution",
          "content": "United Nations Educational, Scientific, and Cultural Organization, Hamburg (Germany). Inst. for Education."
        }, {
          "scheme": "personal author",
          "content": "Giere, Ursula"
        }],
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "Emerging adult education policies and strategies were studied through a survey of United Nations Educational, Scientific, and Cultural Organization (UNESCO) member states, nongovernmental organizations (NGOs), and social partners. Questionnaires were returned by 93 countries and 12 NGOs. The study focused on the following: social change and its impact on adult education since 1985; adult education around the world; trends in adult learning around the world; formal and nonformal adult basic education; adult literacy; adult learning and the technological revolution; vocational training for adults; education toward a culture of peace; education for a democratic, civil society; education and the all-round development of all individuals; formulation of a broader vision of adult  learning; integration of adult learning into the lifelong learning system; the changing role of the state, universities, and NGOs; the strengthening of cooperative structures; new ways of financing adult education; and UNESCO's role in the future of adult learning. Despite differences in individual respondents' opinions regarding how adult education goals should be prioritized and reached, there was general consensus that adult learning must be integrated into the lifelong learning system and no longer viewed only as a second chance for disadvantaged individuals, a means of reaching the unreached, or tool to provide skills to the unskilled. (MN)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410375"
        },
        "dc:title": "Adult Learning in a World at Risk: Emerging Policies and Strategies. Expectations and Prospects for the 21st Century As Voiced by Respondents to a 1996 UNESCO Questionnaire in Preparation for the Fifth International Conference on Adult Education (CONFINTEA V). CONFINTEA Background Document.",
        "dc:source": null,
        "eric:citation": null,
        "dc:date": "1997-00-00",
        "eric:sponsor": null,
        "eric:isbn": "ISBN-92-820-1082-1",
        "dcterms:audience": null,
        "eric:pageCount": 38,
        "dc:publisher": null,
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": null,
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    }, {
      "header": {
        "action": "New"
      },
      "metadata": {
        "dcterms:accessRights": "No",
        "dc:subject": ["Access to Education", "Adult Education", {
          "weight": "MAJOR",
          "content": "Adult Learning"
        }, "Adult Literacy", "Aging (Individuals)", "Cooperative Planning", "Correctional Education", "Distance Education", {
          "weight": "MAJOR",
          "content": "Education Work Relationship"
        }, "Educational Change", "Educational Environment", {
          "weight": "MAJOR",
          "content": "Educational Finance"
        }, "Educational Needs", "Educational Planning", "Educational Practices", "Educational Quality", "Educational Technology", "Empowerment", "Environmental Education", "Equal Education", "Foreign Countries", "Global Education", "Government Role", "Government School Relationship", "Health Education", "Health Promotion", "Information Technology", {
          "weight": "MAJOR",
          "content": "International Cooperation"
        }, "International Educational Exchange", "Labor Force Development", "Literacy Education", "Migrant Education", "Minority Groups", "Multicultural Education", "Nonformal Education", "Nongovernmental Organizations", "Refugees", "Special Needs Students", "Womens Education"],
        "dc:type": ["Collected Works - Serials", "Reports - Research"],
        "eric:issn": "ISSN-0342-7633",
        "dc:creator": [{
          "scheme": "institution",
          "content": "United Nations Educational, Scientific, and Cultural Organization, Hamburg (Germany). Inst. for Education."
        }, {
          "scheme": "institution",
          "content": "German Adult Education Association, Bonn (Germany). Inst. for International Cooperation."
        }],
        "dc:language": "English",
        "dcterms:educationLevel": null,
        "dc:description": "The following papers are included: \"Foreword\" (Jakob Horn, Paul Belanger); \"Internationalization and Globalization\" (Ove Korsgaard); \"Adult Learning and the Challenges of the 21st Century\" (Marc-Laurent Hazoume); \"Diversity in Adult Education: Some Key Concepts in Minority and Indigenous Issues\" (Linda King de Jardon); \"The Culture of Peace: The UNESCO (United Nations Educational, Scientific, and Cultural Organization) Perspective\" (David Adams); \"Literacy on the Eve of CONFINTEA: Observations, Questions and Action Plans\" (Jean-Paul Hautecoeur); \"Learning Gender Justice: The Challenge for Adult Education in the 21st Century\" (Carolyn Medel-Anonuevo); \"Adult Education and the Changing World of Work. Focal Points of Change\" (R. Barry Hobart); \"Environmental NGOs (Nongovernmental  Organizations) and Adult Education as 21st Century Partners in Civil Society--from the Local to the Global Level\" (Rene Karottki); \"The Environment: A Unifying Theme for Adult Education\" (Walter Leal Filho); \"From Words to Action: Environmental Adult Education\" (Darlene E. Clover); \"Environmental Adult Education: A Factor in Sustainable Development on the Eve of the 3rd Millennium\" (Adoum N'Gaba-Waye); \"Health Education and Health Promotion\" (Health Education and Health Promotion Unit, Division of Health Promotion, Education and Communication, World Health Organization); \"Population Education for Adults\" (O.J. Sikes); \"Adult Learning, Media, Culture and New Information and Communication Technologies\" (Chris Cavanagh); \"Adult Education and Aging. Trends and Critical Issues\" (Paul Belanger,  Rosa M. Falgas); \"Moving across Borders, Cultures and Mindsets: Prospects for Migrant and Refugee Education in the 21st Century\" (Carolyn Medel-Anonuevo); \"Education in Prisons: Key Words for Freedom\" (Marc De Maeyer); \"Economics of Adult Education and Training\" (Albert C. Tuijnman); \"Economics of Non-Formal Education\" (Manzoor Ahmed); \"Enhancing International Cooperation and Solidarity\" (Paul Fordham). Also included is \"Adult Learning: Empowerment for Local and Global Change in the Twenty-First Century: A Discussion Guide.\" (MN)",
        "dc:identifier": {
          "scheme": "eric_accno",
          "content": "ED410376"
        },
        "dc:title": "Adult Learning: A Key for the 21st Century. CONFINTEA V Background Papers (Hamburg, Germany, July 14-18, 1997).",
        "dc:source": "Adult Education and Development",
        "eric:citation": "spec iss 1997",
        "dc:date": "1997-00-00",
        "eric:sponsor": null,
        "eric:isbn": null,
        "dcterms:audience": null,
        "eric:pageCount": 233,
        "dc:publisher": null,
        "eric:peer_reviewed": "N/A",
        "eric:dateAdded": 1998,
        "eric:referenceCount": null,
        "eric:abstractor": null,
        "eric:issue": "RIEJAN1998",
        "eric:ies_funded": null,
        "eric:contract_number": null,
        "eric:wwcguide_link": null,
        "eric:ies_publication_link": null,
        "eric:report_number": null,
        "eric:note": null
      }
    },
      {
        "header": {
          "action": "New"
        },
        "metadata": {
          "dcterms:accessRights": "Yes",
          "dc:subject": ["Access to Education", "Adolescents", "Adult Education", "Adult Literacy", "Change Strategies", "Citizenship Education", "Community Development", "Culture", "Developing Nations", "Economic Development", "Economically Disadvantaged", "Education Work Relationship", "Educational Cooperation", "Educational Needs", "Educational Objectives", "Educational Policy", "Educational Practices", "Equal Education", "Foreign Countries", "Individual Development", "International Cooperation", "International Educational Exchange", "International Organizations", "Lifelong Learning", "Literacy Education", "Meetings", "Needs Assessment", "Nonformal Education", "Nongovernmental Organizations", "Partnerships in Education", "Popular Education", "Position Papers", "Poverty", "Regional Planning", "Role of Education", "Rural Education", "Sex Fairness", "Vocational Education", "Womens Education"],
          "dc:type": "Reports - Research",
          "eric:keywords": ["Europe", "Arab States", "Caribbean", "Asia Pacific Region", "Africa", "Latin America"],
          "eric:keywords_geo": "Africa",
          "eric:issn": null,
          "dc:creator": {
            "scheme": "institution",
            "content": "United Nations Educational, Scientific, and Cultural Organization, Hamburg (Germany). Inst. for Education."
          },
          "dc:language": "English",
          "dcterms:educationLevel": null,
          "dc:description": "This document contains information about and papers from meetings of educational practitioners and policymakers in the Asia-Pacific region, Africa, Latin America and the Caribbean, Europe, and the Arab States and a collective consultation of nongovernmental organizations (NGOs) on literacy and education for all. Contents (arranged by region) are as follows: &quot;1996 Jomtien Declaration on Adult Education and Lifelong Learning&quot;; &quot;The Bank Has a Re-Think&quot;; &quot;Maoris: A Longtime Educative Tradition&quot; (Nora Rameka); interviews and reports from parts of Asia; &quot;Intellectual Responsibility in Development&quot;; &quot;Declaration on Adult Education and Lifelong Learning&quot;; &quot;Setting Up a Programme Is Not Enough&quot; (Alice Tiendrebeogo); &quot;A Book for Six Inhabitants&quot; (Antonio da Silva); &quot;Peace in the Land of  Blue Plastic&quot; (Uwizeyimana Adorata); &quot;Unwanted Gifts&quot; (Ousmane Faty Ndongo); &quot;Backing the Commitment of African Intellectuals&quot; (A. Niameogo); &quot;South African Adult Education Post-1994&quot; (Joe Samuels); interviews; &quot;Education of Young People and Adults to Consolidate Democracy&quot;; &quot;Declaration and Recommendations of the Latin American and Caribbean Regional Preparatory Conference&quot;; &quot;Read the Word...&quot; (Sergio Haddad); &quot;We Also Count!&quot; (Lola Cendales); &quot;Calandria&quot; (Rosa Maria Alfaro Moreno); interviews; &quot;The Role of NGOs in the Transformation of Adult Education in Latin America&quot; (Jorge Osorio Vargas); &quot;'Everyone Has to Learn Everything'&quot; (Ximena Machicao Barbery); &quot;Adult Education, Society and the Strengthening of Democracy&quot; (Jose Rivero); &quot;We Learned...&quot; (Ximena Eugenia Paniagua Padilla);&quot;Defining Cultural Identities&quot;; conference report; &quot;Is Literacy Neglected?&quot; (Serge Wagner); &quot;Creative Protagonists: The Role of Environmental Pedagogy&quot; (P. Orefice); &quot;An Already Long State--Civil Society Dialogue&quot; (Anne Depuydt); &quot;Masks&quot;&quot;Meeting with Mr. D. Lenarduzzi&quot;; &quot;The New Modern Concept of Adult Education in Russia&quot; (V. Onushkin); &quot;Adult Learners' Week&quot; (Alan Tuckett); &quot;A Strengthened Partnership&quot;; &quot;The Hamburg NGO Platform on Adult Learning for the 21st Century&quot;; &quot;Vocational Education and Training&quot; (Ulf Fredriksson); &quot;You Can't Tie Up a Bundle of Firewood with One Hand&quot; (Mariam Kone Traore); &quot;Turning the Disadvantaged into Free Decision-Makers&quot; (Ton Redegeld); &quot;Some of the Contributions of Non-Formal Teaching to Formal Teaching&quot; (Max Cloupet); &quot;Adult Education and the Changing  World of the Workplace&quot; (D. Kahler); &quot;Growing Together through Partnership&quot; (Adama Ouane); &quot;Beyond Programmes: Commitment, Values and NGOs&quot; (Clinton Robinson); &quot;Constructing Society&quot;; &quot;Arab Declaration on Adult Education&quot;; &quot;Campaigning for All Rights&quot; (Aicha Barki); &quot;Adolescent Women and Civic Society in MENA (the Middle East and North Africa)&quot; (Frank Dall); &quot;Culture and Spirituality&quot; (Bacher Bakri); &quot;The Emergence of a Civil Society&quot; (Kacem Bensalah); interviews; &quot;A Society Which Includes Women&quot; (Aicha Belarbi); &quot;The Socio-political Dimension of Gender: A Tool for Fair Development&quot; (Marcela Ballara); and &quot;Using Modern Technology Is Almost a Second Nature&quot; (Mark Tennant). (MN)",
          "dc:identifier": {
            "scheme": "eric_accno",
            "content": "ED410377"
          },
          "dc:title": "Months of Debate. Six Preparatory Meetings for the International Conference on Adult Education (5th, Hamburg, Germany, July 14-18, 1997).",
          "dc:source": null,
          "eric:citation": null,
          "dc:date": "1997-00-00",
          "eric:sponsor": null,
          "eric:isbn": "ISBN-92-820-1079-1",
          "dcterms:audience": null,
          "eric:pageCount": 91,
          "dc:publisher": null,
          "eric:peer_reviewed": "N/A",
          "eric:dateAdded": 1998,
          "eric:referenceCount": null,
          "eric:abstractor": null,
          "eric:issue": null,
          "eric:ies_funded": null,
          "eric:contract_number": null,
          "eric:wwcguide_link": null,
          "eric:ies_publication_link": null,
          "eric:report_number": null,
          "eric:note": null
        }
      }, {
        "header": {
          "action": "New"
        },
        "metadata": {
          "dcterms:accessRights": "Yes",
          "dc:subject": ["Adult Education", "Adult Educators", "Competence", "Continuing Education", "Correspondence Study", "Education Work Relationship", "Educational Change", "Educational Cooperation", "Educational Objectives", "Educational Practices", "Educational Principles", "Educational Trends", "Enrollment Influences", "Enrollment Trends", "Financial Support", "Foreign Countries", "Industrial Training", "Lifelong Learning", "Nonformal Education", "Participation", "Political Issues", "Postsecondary Education", "Role of Education", "Social Change", "Teacher Characteristics", "Teacher Education", "Teacher Qualifications", "Training", "Vocational Education"],
          "dc:creator": [{
            "scheme": "personal author",
            "content": "Dohmen, Gunther"
          }, {
            "scheme": "institution",
            "content": "Federal Ministry of Education, Science, Research, and Technology, Bonn (Germany)."
          }],
          "dc:type": "Reports - Descriptive",
          "eric:keywords": "Germany",
          "eric:keywords_geo": "Germany",
          "eric:issn": null,
          "dc:language": "English",
          "dcterms:educationLevel": null,
          "dc:description": "This document reports on the aims, structure, delivery, and reform of continuing education in Germany. The following are among the topics discussed: aims, definitions, and areas of continuing education; structural principles, organizations, and competencies (institutional providers, cooperation, open access, public responsibility, innovative development, situation-oriented learning, quality assurance, program management, multimedia); special experience in further learning in connection with German unification (learning within a process of social transformation, problems in developing competencies); participation in continuing education (general trends, participant groups, participation in informal vocational continuing education, internal and external conditions affecting  participation); adult educators and their qualifications and training; and current reform efforts (eliminating marginalization, supporting self-directed living and learning, overcoming separations between general and vocational continuing education, using new technologies, orienting the continuing education sector to the employment crisis, developing a learning society). Concluding the document are 70 footnotes. (MN)",
          "dc:identifier": {
            "scheme": "eric_accno",
            "content": "ED410378"
          },
          "dc:title": "Continuing Education in Germany. Contribution to UNESCO's International Conference on Adult Education (5th, Hamburg, Germany, July 1997).",
          "dc:source": null,
          "eric:citation": null,
          "dc:date": "1997-07-00",
          "eric:sponsor": null,
          "eric:isbn": null,
          "dcterms:audience": null,
          "eric:pageCount": 35,
          "dc:publisher": null,
          "eric:peer_reviewed": "N/A",
          "eric:dateAdded": 1998,
          "eric:referenceCount": null,
          "eric:abstractor": null,
          "eric:issue": null,
          "eric:ies_funded": null,
          "eric:contract_number": null,
          "eric:wwcguide_link": null,
          "eric:ies_publication_link": null,
          "eric:report_number": null,
          "eric:note": null
        }
      }]
  }
}
