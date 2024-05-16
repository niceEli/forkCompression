The OEIS mourns the passing of Jim Simons and is grateful to the Simons Foundation for its support of research in many branches of science, including the OEIS.
login
The OEIS is supported by the many generous donors to the OEIS Foundation.


Logo
    Hints
(Greetings from The On-Line Encyclopedia of Integer Sequences!)
A007526		a(n) = n(a(n-1) + 1), a(0) = 0.
(Formerly M3505)		52
0, 1, 4, 15, 64, 325, 1956, 13699, 109600, 986409, 9864100, 108505111, 1302061344, 16926797485, 236975164804, 3554627472075, 56874039553216, 966858672404689, 17403456103284420, 330665665962403999, 6613313319248080000, 138879579704209680021, 3055350753492612960484 (list; graph; refs; listen; history; text; internal format)
OFFSET	
0,3
COMMENTS	
Eighteenth- and nineteenth-century combinatorialists call this the number of (nonnull) "variations" of n distinct objects, namely the number of permutations of nonempty subsets of {1,...,n}. Some early references to this sequence are Izquierdo (1659), Caramuel de Lobkowitz (1670), Prestet (1675) and Bernoulli (1713). - Don Knuth, Oct 16 2001, Aug 16 2004
Stirling transform of A006252(n-1) = [0,1,1,2,4,14,38,...] is a(n-1) = [0,1,4,15,64,...]. - Michael Somos, Mar 04 2004
In particular, for n >= 1 a(n) is the number of nonempty sequences with n or fewer terms, each a distinct element of {1,...,n}. - Rick L. Shepherd, Jun 08 2005
a(n) = VarScheme(1,n). See A128195 for the definition of VarScheme(k,n). - Peter Luschny, Feb 26 2007
if s(n) is a sequence of the form s(0)=x, s(n)= n(s(n-1)+k), then s(n)= n!*x + a(n)*k. - Gary Detlefs, Jun 06 2010
Exponential convolution of factorials (A000142) and nonnegative integers (A001477). - Vladimir Reshetnikov, Oct 07 2016
REFERENCES	
Jacob Bernoulli, Ars Conjectandi (1713), page 127.
Johannes Caramuel de Lobkowitz, Mathesis Biceps Vetus et Nova (Campania: 1670), volume 2, 942-943.
J. K. Horn, personal communication to Robert G. Wilson v.
Sebastian Izquierdo, Pharus Scientiarum (Lyon: 1659), 327-328.
Jean Prestet, Elemens des Mathematiques (1675), page 341.
N. J. A. Sloane and Simon Plouffe, The Encyclopedia of Integer Sequences, Academic Press, 1995 (includes this sequence).
LINKS	
Alois P. Heinz, Table of n, a(n) for n = 0..450 (first 101 terms from T. D. Noe)
J. L. Adams, Conceptual Blockbusting: A Guide to Better Ideas,  Freeman, San Francisco, 1974. [Annotated scans of pages 69 and 70 only]
J. Bernoulli, Wahrscheinlichkeitsrechnung (Ars conjectandi) von Jakob Bernoulli (1713) Uebers. und hrsg. von R. Haussner, Leipzig, W. Engelmann, (1899), [124] Kapitel VII. Variationen ohne Wiederholung. (Page 121).
Peter J. Freyd, Core algebra revisited, Theoretical Computer Science, 375 (2007), Issues 1-3, 193-200.
Z. Kasa and Z. Katai, Scattered subwords and composition of natural numbers, Acta Univ. Sapientiae, Informatica, 4, 2 (2012) 225-236. - From N. J. A. Sloane, Feb 21 2013
J. Sawada, A. Williams, Successor rules for flipping pancakes and burnt pancakes, Preprint 2015.
Elmar Teufl and Stephan Wagner, Enumeration problems for classes of self-similar graphs, Journal of Combinatorial Theory, Series A, Volume 114, Issue 7, October 2007, Pages 1254-1277.
FORMULA	
a(n) = A000522(n) - 1.
a(n) = floor(e*n! - 1). - Joseph K. Horn
a(n) = Sum_{r=1..n} A008279(n, r)= n!*(Sum_{k=0..n-1} 1/k!).
a(n) = n(a(n-1) + 1).
E.g.f.: x*exp(x)/(1-x). - Vladeta Jovovic, Aug 25 2002
a(n) = Sum_{k=1..n} k!*C(n, k). - Benoit Cloitre, Dec 06 2002
a(n) = Sum_{k=0..n-1} (n! / k!). - Ross La Haye, Sep 22 2004
a(n) = Sum_{k=1..n} (Product_{j=0..k-1} (n-j)). - Joerg Arndt, Apr 24 2011
Binomial transform of n! - !n. - Paul Barry, May 12 2004
Inverse binomial transform of A066534. - Ross La Haye, Sep 16 2004
For n > 0, a(n) = exp(1) * Integral_{x>=0} exp(-exp(x/n)+x) dx. - Gerald McGarvey, Oct 19 2006
a(n) = Integral_{x>=0} (((1+x)^n-1)*exp(-x)). - Paul Barry, Feb 06 2008
a(n) = GAMMA(n+2)*(1+(-GAMMA(n+1)+exp(1)*GAMMA(n+1, 1))/GAMMA(n+1)). - Thomas Wieder, May 02 2009
E.g.f.: -1/G(0) where G(k) = 1 - 1/(x - x^3/(x^2+(k+1)/G(k+1))); (continued fraction). - Sergei N. Gladkovskii, Jun 10 2012
Conjecture : a(n) = (n+2)*a(n-1) - (2*n-1)*a(n-2) + (n-2)*a(n-3). - R. J. Mathar, Dec 04 2012 [Conjecture verified by Robert FERREOL, Aug 04 2018]
G.f.: (Q(0) - 1)/(1-x), where Q(k)= 1 + (2*k + 1)*x/( 1 - x - 2*x*(1-x)*(k+1)/(2*x*(k+1) + (1-x)/Q(k+1))); (continued fraction). - Sergei N. Gladkovskii, May 09 2013
G.f.: 2/((1-x)*G(0)) - 1/(1-x), where G(k)= 1 + 1/(1 - x*(2*k+2)/(x*(2*k+3) - 1 + x*(2*k+2)/G(k+1))); (continued fraction). - Sergei N. Gladkovskii, May 31 2013
a(n) = (...((((((0)+1)*1+1)*2+1)*3+1)*4+1)...*n). - Bob Selcoe, Jul 04 2013
G.f.: Q(0)/(2-2*x) - 1/(1-x), where Q(k)= 1 + 1/(1 - x*(k+1)/(x*(k+1) + (1-x)/Q(k+1) )); (continued fraction). - Sergei N. Gladkovskii, Aug 09 2013
G.f.: (W(0) - 1)/(1-x), where W(k) = 1 - x*(k+1)/( x*(k+2) - 1/(1 - x*(k+1)/( x*(k+1) - 1/W(k+1) ))); (continued fraction). - Sergei N. Gladkovskii, Aug 25 2013
For n > 0: a(n) = n*A000522(n-1). - Reinhard Zumkeller, Aug 27 2013
a(n) = (...(((((0)*1+1)*2+2)*3+3)*4+4)...*n+n). - Bob Selcoe, Apr 30 2014
0 = 1 + a(n)*(+1 + a(n+1) - a(n+2)) + a(n+1)*(+2 +a(n+1)) - a(n+2) for all n >= 0. - Michael Somos, Aug 30 2016
a(n) = n*hypergeom([1, 1-n], [], -1). - Peter Luschny, May 09 2017
Product_{n>=1} (a(n)+1)/a(n) = e, coming from Product_{n=1..N}(a(n)+1)/a(n) = Sum_{n=0..N} 1/n!. - Robert FERREOL, Jul 12 2018
O.g.f.: Sum_{k>=1} k^k*x^k/(1 + (k - 1)*x)^(k+1). - Ilya Gutkovskiy, Oct 09 2018
EXAMPLE	
G.f. = x + 4*x^2 + 15*x^3 + 64*x^4 + 325*x^5 + 1956*x^6 + 13699*x^7 + ...
Consider the nonempty subsets of the set {1,2,3,...,n} formed by the first n integers. E.g., for n = 3 we have {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}. For each subset S we determine its number of parts, that is nprts(S). The sum over all subsets is written as sum_{S=subsets}. Then we have A007526 = Sum_{S=subsets} nprts(S)!. E.g., for n = 3 we have 1!+1!+1!+2!+2!+2!+3! = 15. - Thomas Wieder, Jun 17 2006
a(3)=15: Let the objects be a, b, and c. The fifteen nonempty ordered subsets are {a}, {b}, {c}, {ab}, {ba}, {ac}, {ca}, {bc}, {cb}, {abc}, {acb}, {bac}, {bca}, {cab} and {cba}.
MAPLE	
A007526 := n -> add(n!/k!, k=0..n) - 1;
a := n -> n*hypergeom([1, 1-n], [], -1):
seq(simplify(a(n)), n=0..22); # Peter Luschny, May 09 2017
# third Maple program:
a:= proc(n) option remember;
      `if`(n<0, 0, n*(1+a(n-1)))
    end:
seq(a(n), n=0..23);  # Alois P. Heinz, Jan 06 2020
MATHEMATICA	
Table[ Sum[n!/(n - r)!, {r, 1, n}], {n, 0, 20}] (* or *) Table[n!*Sum[1/k!, {k, 0, n - 1}], {n, 0, 20}]
a=1; Table[a=(a-1)*(n-1); Abs[a], {n, 0, 40}] (* Vladimir Joseph Stephan Orlovsky, Nov 20 2009 *)
FoldList[#1*#2 + #2 &, 0, Range[19]] (* Robert G. Wilson v, Jul 07 2012 *)
f[n_] := Floor[E*n! - 1]; f[0] = 0; Array[f, 20, 0] (* Robert G. Wilson v, Feb 06 2015 *)
a[n_] := n (a[n - 1] +1); a[0] = 0; Array[a, 20, 0] (* Robert G. Wilson v, Feb 06 2015 *)
Round@Table[E n Gamma[n, 1], {n, 0, 20}] (* Round is equivalent to FullSimplify here, but is much faster - Vladimir Reshetnikov, Oct 07 2016 *)
PROG	
(PARI) {a(n) = if( n<1, 0, n * (a(n-1) + 1))}; /* Michael Somos, Apr 06 2003 */
(PARI) {a(n) = if( n<0, 0, n! * polcoeff(x * exp(x + x * O(x^n)) / (1 - x), n))}; /* Michael Somos, Mar 04 2004 */
(PARI) a(n)= sum(k=1, n, prod(j=0, k-1, n-j))
(Haskell)
a007526 n = a007526_list !! n
a007526_list = 0 : zipWith (*) [1..] (map (+ 1) a007526_list)
-- Reinhard Zumkeller, Aug 27 2013
(GAP) a:=[0];; for n in [2..25] do a[n]:=(n-1)*(a[n-1]+1); od; a; # Muniru A Asiru, Aug 07 2018
CROSSREFS	
Row sums of A068424.
Partial sums of A001339.
Column k=1 of A326659.
Cf. A000522, A007526, A001339, A128195.
Sequence in context: A117669 A323789 A341922 * A233536 A349202 A318121
Adjacent sequences:  A007523 A007524 A007525 * A007527 A007528 A007529
KEYWORD	
nonn,easy
AUTHOR	
N. J. A. Sloane, Robert G. Wilson v
STATUS	
approved
Lookup | Welcome | Wiki | Register | Music | Plot 2 | Demos | Index | Browse | More | WebCam
Contribute new seq. or comment | Format | Style Sheet | Transforms | Superseeker | Recents
The OEIS Community | Maintained by The OEIS Foundation Inc.
License Agreements, Terms of Use, Privacy Policy. .
Last modified May 16 13:17 EDT 2024. Contains 372552 sequences. (Running on oeis4.)